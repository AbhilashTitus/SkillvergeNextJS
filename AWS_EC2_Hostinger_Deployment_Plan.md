# AWS EC2 & Next.js Deployment Guide (Hostinger Domain)

## 1. Executive Summary
This document outlines the comprehensive procedure for deploying the **Skillverge** Next.js application to an AWS EC2 instance (Free Tier). It includes setting up a robust production environment with Ubuntu, Nginx as a reverse proxy, PM2 for process management, and SSL encryption. It also covers the critical step of enabling Virtual RAM (Swap) to prevent build failures on the limited memory of `t2.micro` instances.

---

## 2. Prerequisites
Before beginning, ensure you have:
*   **AWS Account**: Access to the AWS Console (Free Tier eligible).
*   **Hostinger Account**: Access to manage DNS records for your bought domain.
*   **GitHub Repository**: The latest code pushed to a Git repository (Private or Public).

---

## 3. Infrastructure Operations (AWS)

### 3.1. Launching the Server
1.  **Login to AWS Console** and navigate to **EC2**.
2.  **Launch Instance**:
    *   **Name**: `Skillverge-Prod-Server`
    *   **AMI (OS)**: Ubuntu Server 24.04 LTS (HVM), SSD Volume Type.
    *   **Architecture**: 64-bit (x86).
    *   **Instance Type**: `t2.micro` (1 vCPU, 1 GiB Memory) - Free Tier Eligible.
3.  **Key Pair (Access Credentials)**:
    *   Select **Create new key pair**.
    *   **Name**: `skillverge-key`.
    *   **Type**: RSA.
    *   **Format**: `.pem`.
    *   **Action**: Download and store `skillverge-key.pem` safely (e.g., in `Downloads`).
4.  **Network Settings**:
    *   **Auto-assign Public IP**: Enable.
    *   **Security Groups**: Create a new security group.
    *   **Inbound Rules**:
        *   **SSH** (Port 22) - Source: Anywhere `0.0.0.0/0`.
        *   **HTTP** (Port 80) - Source: Anywhere `0.0.0.0/0`.
        *   **HTTPS** (Port 443) - Source: Anywhere `0.0.0.0/0`.
5.  **Storage**: Default (8 GB gp3) is sufficient.
6.  **Launch**: Click "Launch Instance".

### 3.2. Connecting via AWS Console (EC2 Instance Connect)
1.  Go to the **AWS Management Console** > **EC2 Dashboard**.
2.  Click on **Instances** in the sidebar and select your instance (`Skillverge-Prod-Server`).
3.  Click the **Connect** button (top right).
4.  Select the **EC2 Instance Connect** tab.
5.  Keep the default username (`ubuntu`) and click **Connect**.
6.  A new browser tab will open with a terminal interface. You are now inside your server.

---

## 4. Server Configuration

### 4.1. System Updates
Ensure the Linux kernel and packages are up to date.
```bash
sudo apt update && sudo apt upgrade -y
```

### 4.2. Virtual RAM (Swap) Setup [CRITICAL]
Directly addressing the 1GB RAM limitation to prevent `npm run build` crashes.

1.  **Check current memory** (Verify Swap is 0):
    ```bash
    free -h
    ```
2.  **Create 4GB Swap File**:
    ```bash
    sudo fallocate -l 4G /swapfile
    ```
3.  **Secure the file**:
    ```bash
    sudo chmod 600 /swapfile
    ```
4.  **Initialize Swap**:
    ```bash
    sudo mkswap /swapfile
    ```
5.  **Enable Swap**:
    ```bash
    sudo swapon /swapfile
    ```
6.  **Make Permanent** (Persist after reboot):
    ```bash
    echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    ```
7.  **Optimize Swappiness**:
    ```bash
    sudo sysctl vm.swappiness=10
    ```
8.  **Verify**:
    ```bash
    free -h
    ```
    *(You should see ~4GB in the Swap row)*.

### 4.3. Tool Installation
Install Node.js, Git, PM2, and Nginx.

1.  **Install Node.js via NVM** (Best practice for version control):
    ```bash
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm install --lts
    ```
2.  **Install PM2 (Process Manager)**:
    ```bash
    npm install -g pm2
    ```
3.  **Install Git & Nginx**:
    ```bash
    sudo apt install git nginx -y
    ```

---

## 5. Application Deployment

### 5.1. Code Setup
1.  **Clone Repository**:
    ```bash
    git clone https://github.com/YOUR_GITHUB_USER/SkillvergeNextJS.git
    cd SkillvergeNextJS
    ```
    *(Note: For private repos, generate a GitHub Personal Access Token and use it as the password).*

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create the `.env.local` file on the server.
    ```bash
    nano .env.local
    ```
    *   Paste the content of your local `.env.local` here.
    *   Save: `Ctrl+X`, `Y`, `Enter`.

### 5.2. Build & Launch
1.  **Build Application**:
    ```bash
    npm run build
    ```
    *(This should now succeed thanks to the Swap space).*

2.  **Start with PM2**:
    ```bash
    pm2 start npm --name "skillverge" -- start
    ```

3.  **Configure Startup Script**:
    Ensure the app restarts if the server reboots.
    ```bash
    pm2 save
    pm2 startup
    ```
    *(Run the command output by `pm2 startup` as instructed).*

---

## 6. Networking & Domain (Hostinger)

### 6.1. DNS Records
Login to Hostinger -> Manage Domain -> DNS / Nameservers.

1.  **Record A (@)**:
    *   **Type**: A
    *   **Name**: @
    *   **Points to**: [YOUR_EC2_PUBLIC_IP]
    *   **TTL**: 300 (or default)
2.  **Record CNAME (www)**:
    *   **Type**: CNAME
    *   **Name**: www
    *   **Points to**: @ (or yourdomain.com)
    *   **TTL**: 300

### 6.2. Nginx Reverse Proxy
Configure Nginx to route traffic from port 80 to Next.js port 3000.

1.  **Edit Config**:
    ```bash
    sudo nano /etc/nginx/sites-available/default
    ```
2.  **Paste Configuration**:
    ```nginx
    server {
        listen 80;
        server_name yourdomain.com www.yourdomain.com;

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```
3.  **Apply Changes**:
    ```bash
    sudo nginx -t
    sudo systemctl restart nginx
    ```

---

## 7. Security (SSL/HTTPS)
Secure the application using Let's Encrypt / Certbot.

1.  **Install Certbot**:
    ```bash
    sudo apt install certbot python3-certbot-nginx -y
    ```
2.  **Generate Certificate**:
    ```bash
    sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
    ```
3.  **Configuration**:
    *   Enter email for renewal alerts.
    *   Agree to terms.
    *   If asked, choose **Option 2 (Redirect)** to force HTTPS.

---

## 8. Maintenance Workflow
To update your live site after pushing changes to GitHub:

```bash
# 1. Pull latest code
git pull origin main

# 2. Update dependencies (if needed)
npm install

# 3. Rebuild app
npm run build

# 4. Restart process
pm2 restart skillverge
```
