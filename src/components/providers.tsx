"use client";
import { APIProvider } from '@vis.gl/react-google-maps'
import { SessionProvider } from 'next-auth/react';
import React from 'react'

function Providers({ mapsKey, children }: { mapsKey: string, children: React.ReactNode }) {
  return (
    <SessionProvider>
      <APIProvider apiKey={mapsKey} libraries={["geometry"]}>
        {children}
      </APIProvider>
    </SessionProvider>
  );
}

export default Providers