import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import { AuthProvider } from "@/lib/AuthContext";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Skillverge",
  description: "Skillverge - Affordable online learning platform. Upgrade your skills with courses starting from ₹100.",
  keywords: ["online learning", "courses", "education", "skills", "affordable learning", "EdTech"],
  authors: [{ name: "Skillverge Team" }],
  creator: "Skillverge",
  publisher: "Skillverge",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// Set to true to enable maintenance mode across the site
const isMaintenanceMode = false;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />
        <meta name="theme-color" content="#2D6DF6" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${montserrat.variable} antialiased selection:bg-primary/20`} suppressHydrationWarning>
        {isMaintenanceMode ? (
          <main className="min-h-screen w-full flex items-center justify-center bg-zinc-50 px-6 font-sans">
            <div className="w-full max-w-2xl text-center space-y-8 animate-in fade-in duration-1000">
              <div className="relative inline-block">
                <div className="absolute -inset-1 rounded-full bg-primary/20 blur-xl animate-pulse"></div>
                <div className="relative bg-white p-6 rounded-full shadow-sm border border-zinc-100">
                  <i className="bi bi-gear-wide-connected text-5xl text-primary animate-spin-[20s] block"></i>
                </div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl font-black text-secondary tracking-tight">
                  Briefly <span className="text-primary italic">Updating.</span>
                </h1>
                <p className="text-xl text-zinc-600 max-w-lg mx-auto leading-relaxed">
                  We're fine-tuning Skillverge to bring you a better learning experience. 
                  Our engineers are hard at work and we'll be back in a flash.
                </p>
              </div>

              <div className="flex flex-col items-center gap-6 pt-4">
                <div className="h-1 w-24 bg-zinc-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-1/2 animate-progress"></div>
                </div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-full text-sm font-semibold text-zinc-500 shadow-sm">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  System Upgrade in Progress
                </div>
              </div>
            </div>
          </main>
        ) : (
          <CartProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </CartProvider>
        )}
      </body>
    </html>
  );
}
