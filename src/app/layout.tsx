import Providers from "@/components/providers";
import { env } from "@/env";
import "@/styles/globals.css";
import { APIProvider } from "@vis.gl/react-google-maps";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Boilerguessr",
  description: "Geoguessr but Purdue",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <Providers mapsKey={env.GOOGLE_MAPS_KEY}>
        <body>
          <div className="flex min-h-[5dvh] flex-row items-center gap-4">
            <p>Top Bar</p>
          </div>
          {children}
        </body>
      </Providers>
    </html>
  );
}
