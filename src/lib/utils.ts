import { DBLocation } from "@/server/db/schema";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Coords } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function latLng(location: DBLocation): Coords {
  return {
    lat: parseFloat(location.latitude),
    lng: parseFloat(location.longitude),
  };
}

export function distanceToPoints(distanceInMiles: number): number {
  if (distanceInMiles < 0.05) return 100;
  const points = 100 * Math.exp(-4 * distanceInMiles ** 2);
  if (points < 5) return 0;
  return Math.round(points);
}

import { generateReactHelpers } from "@uploadthing/react";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();