import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-main",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

// TODO: ganti ke domain asli kamu saat deploy (dipakai untuk URL absolut OG image).
export const metadata: Metadata = {
  metadataBase: new URL("https://your-domain.com"),
  title: "Yeremia Christopher Wicaksana — Fullstack Developer",
  description:
    "Portfolio of Yeremia (Jerry), a fullstack developer building end to end and exploring Web3.",
  keywords: [
    "Yeremia Christopher Wicaksana",
    "Jerry",
    "Fullstack Developer",
    "Web Developer",
    "Web3",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Yeremia Christopher Wicaksana" }],
  creator: "Yeremia Christopher Wicaksana",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Yeremia Christopher Wicaksana — Fullstack Developer",
    description:
      "Portfolio of Yeremia (Jerry), a fullstack developer building end to end and exploring Web3.",
    siteName: "Yeremia · Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yeremia Christopher Wicaksana — Fullstack Developer",
    description:
      "Fullstack developer building end to end and exploring Web3.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
