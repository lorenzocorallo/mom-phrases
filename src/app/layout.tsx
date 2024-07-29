import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
  title: "LC | Mom Phrases",
  description: "An archive for my mom's most said phrases.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider><HydrateClient>{children}</HydrateClient></TRPCReactProvider>
      </body>
    </html>
  );
}
