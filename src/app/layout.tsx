import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "SwiftLink", 
  description: "A high-performance URL shortener.", 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        
        <div className="bg-blurry-container"></div>
        
      
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}