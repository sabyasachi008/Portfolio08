import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

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
      <body className="min-h-full flex flex-col bg-[#0A0F17] text-[#ededed] font-sans selection:bg-[#00E5FF]/30 selection:text-[#00E5FF]">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
