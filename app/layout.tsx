import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark h-full">
      <body
        className={cn(
          inter.className,
          GeistSans.variable,
          GeistMono.variable,
          "h-full"
        )}
      >
        <div className="m-auto h-full max-w-5xl px-4">
          <Providers>
            <Header />
            <div className="my-4 flex-1">{children}</div>
          </Providers>
        </div>
      </body>
    </html>
  );
}
