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
  title: "Skillverge - Upgrade Your Skills With Affordable Online Learning",
  description: "Skillverge - Affordable online learning platform. Upgrade your skills with courses starting from ₹100.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" />
      </head>
      <body className={`${montserrat.variable} antialiased`}>
        <CartProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}
