import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SpotlightGrid from "@/components/SpotlightGrid";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sabyasachi Ghosh | Full Stack Engineer",
  description: "Portfolio of Sabyasachi Ghosh, Full Stack Engineer & Cloud Architect.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col text-[#ededed] font-sans selection:bg-[#00E5FF]/30 selection:text-[#00E5FF]">
        <SpotlightGrid />
        <div className="relative z-10 flex flex-col flex-grow">
          <CustomCursor />
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
