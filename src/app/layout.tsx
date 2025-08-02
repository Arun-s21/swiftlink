import type { Metadata } from "next";
import "./globals.css";


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
      </body>
    </html>
  );
}