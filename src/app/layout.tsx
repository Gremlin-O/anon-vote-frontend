import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/widgets/Navbar/Navbar";
import GLobalModals from "@/widgets/GlobalModals/GLobalModals";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anon vote",
  description: "A service for anonymous polls",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="h-full antialiased">
        <Navbar></Navbar>
        {children}
        <div id="modals"></div>
        <GLobalModals />
      </body>
    </html>
  );
}
