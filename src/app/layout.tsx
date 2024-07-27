import type { Metadata } from "next";
import { Archivo, Libre_Franklin } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import Providers from "@/components/Providers";
import config from "@/config";
import { auth } from "@/lib/next-auth";
import { cn } from "@/lib/utils";

import "@/app/globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});
const libre_franklin = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-libre_franklin",
});

export const metadata: Metadata = {
  ...config.metadata,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn("flex min-h-screen flex-col bg-background antialiased", archivo.variable + " " + libre_franklin.variable)}
      >
        <SessionProvider session={session}>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
