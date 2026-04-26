import type { Metadata } from "next";
import { Poppins, Playwrite_US_Trad } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/shared/theme-provider/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
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
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${playwrite.variable} antialiased`}
        style={{
          fontFamily:
            '"Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "Hiragino Kaku Gothic Pro", "ヒラギノ角ゴ Pro W3", "メイリオ", Meiryo, "游ゴシック", YuGothic, sans-serif',
        }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Toaster richColors position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
