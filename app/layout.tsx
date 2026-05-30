import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Space_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FITNESS OPS — 10 Week Transformation",
  description:
    "Personal 10-week fitness transformation companion. Calisthenics workouts, arm development, posture correction, face fat reduction, diet tracking, and gamified progress.",
  keywords: [
    "fitness",
    "calisthenics",
    "transformation",
    "workout tracker",
    "posture correction",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#080B0F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${spaceMono.variable} dark h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#080B0F] text-[#E8EDF5] font-mono antialiased">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
