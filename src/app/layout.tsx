import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Birthday Priya Harshana! 🎂 | A Special Presentation",
  description: "A premium, interactive birthday surprise website and journey. Made with love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-full flex flex-col bg-[#faf9f6] text-[#2d2d2d]">
        {children}
      </body>
    </html>
  );
}
