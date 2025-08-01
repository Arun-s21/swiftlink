import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SwiftLink", // You can update this
  description: "A high-performance URL shortener.", // And this
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Add this div for the background */}
        <div className="bg-blurry-container"></div>
        
        {/* Your main content will now render on top of the background */}
        <main>{children}</main>
      </body>
    </html>
  );
}