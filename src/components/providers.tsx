"use client";
import { APIProvider } from '@vis.gl/react-google-maps'
import React from 'react'

function Providers({ mapsKey, children }: { mapsKey: string, children: React.ReactNode }) {
  return (
    <APIProvider apiKey={mapsKey}>
        {children}
    </APIProvider>
  )
}

export default Providers