import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/widgets/Navbar/Navbar";
import GLobalModals from "@/widgets/GlobalModals/GLobalModals";

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
    <html lang="en">
      <body className="h-full">
        <Navbar></Navbar>
        {children}
        <div id="modals"></div>
        <GLobalModals />
      </body>
    </html>
  );
}
