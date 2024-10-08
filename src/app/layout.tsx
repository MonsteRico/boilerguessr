import LoginButton from "@/components/loginButton";
import Providers from "@/components/providers";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import "@/styles/globals.css";
import { APIProvider } from "@vis.gl/react-google-maps";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";
import Link from "next/link";
import { getServerAuthSession } from "@/server/auth";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Boilerguessr",
  description: "Geoguessr but Purdue",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerAuthSession();

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <Providers mapsKey={env.GOOGLE_MAPS_KEY}>
        <body className="bg-background text-foreground">
          <Toaster />
          <NextSSRPlugin
            /**
             * The `extractRouterConfig` will extract **only** the route configs
             * from the router to prevent additional information from being
             * leaked to the client. The data passed to the client is the same
             * as if you were to fetch `/api/uploadthing` directly.
             */
            routerConfig={extractRouterConfig(ourFileRouter)}
          />
          <div className="flex min-h-[5dvh] flex-row items-center justify-between gap-4 p-4 bg-accent text-accent-foreground">
            <div className="flex flex-row items-center gap-2">
              <p>Boilerguessr</p>
              {session && <Link className="font-bold underline hover:opacity-90 transition-all" href={"/upload"}>Upload</Link>}
            </div>
            <div>
              <LoginButton />
            </div>
          </div>
          {children}
        </body>
      </Providers>
    </html>
  );
}
