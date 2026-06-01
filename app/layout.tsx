import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/components/auth/AuthProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
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
  themeColor: "#121416",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} dark h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#121416] text-[#F0F1F3] antialiased font-sans">
        <AuthProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
