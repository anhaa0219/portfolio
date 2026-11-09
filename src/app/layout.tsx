import type { Metadata, Viewport } from "next";
import { Golos_Text, JetBrains_Mono, Unbounded } from "next/font/google";
import "./globals.css";

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "800"],
});

const body = Golos_Text({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

const mono = JetBrains_Mono({
  variable: "--font-data",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Ankhbayar Munkhbaatar · Full-stack developer",
  description:
    "Portfolio of Ankhbayar Munkhbaatar, a full-stack developer in Mongolia building booking systems, payments and the screens around them.",
};

export const viewport: Viewport = {
  themeColor: "#0c0504",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
