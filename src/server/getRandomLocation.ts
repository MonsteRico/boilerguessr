"use server";
import { eq, sql } from "drizzle-orm";
import { db } from "./db";
import { locations, users } from "./db/schema";
import { DBLocation } from "./db/schema";
import { Location } from "@/lib/types";
import { parse } from "path";

export async function getRandomLocation(): Promise<Location> {
  const [location] = await db
    .select()
    .from(locations)
    .orderBy(sql`RANDOM()`)
    .limit(1)
    .execute();
  if (!location) throw new Error("No location found");
  const [uploader] = await db
    .select()
    .from(users)
    .where(eq(users.id, location.createdById))
    .execute();

  const newLocation: Location = {
    latLng: {
      lat: parseFloat(location.latitude),
      lng: parseFloat(location.longitude),
    },
    img: location.imgUrl,
    createdBy: uploader,
  };
  
  return newLocation;
}
