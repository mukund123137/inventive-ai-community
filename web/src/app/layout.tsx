import type { Metadata } from "next";
import { Figtree, Red_Hat_Display } from "next/font/google";
import { AppChrome } from "@/components/layout/AppChrome";
import { Providers } from "@/lib/providers";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
  display: "swap",
});

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-red-hat-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Inventive AI Community",
  description: "Ask & Answer — questions and answers from the Inventive AI community.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${redHatDisplay.variable}`}>
      <body>
        <Providers>
          <AppChrome>{children}</AppChrome>
        </Providers>
      </body>
    </html>
  );
}
