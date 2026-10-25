import type { Metadata } from "next";
import {
  Google_Sans,
  Google_Sans_Code,
  Playwrite_US_Trad,
} from "next/font/google";
import "./globals.css";
import { BackToTopFab } from "@/components/shared/BackToTopFab";
import { RippleEffect } from "@/components/shared/RippleEffect";
import { ThemeProvider } from "@/components/shared/theme-provider/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const googleSans = Google_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-google-sans",
  display: "swap",
  // next/font has no metrics for Google Sans to build a size-adjusted fallback from.
  adjustFontFallback: false,
});

const googleSansCode = Google_Sans_Code({
  subsets: ["latin"],
  variable: "--font-google-sans-code",
  display: "swap",
  adjustFontFallback: false,
});

const playwrite = Playwrite_US_Trad({
  weight: ["400"],
  variable: "--font-playwrite",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MinTani Portfolio",
  description: "Catch up to the stylish MinTani",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${googleSans.variable} ${googleSansCode.variable} ${playwrite.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <BackToTopFab />
          <RippleEffect />
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
