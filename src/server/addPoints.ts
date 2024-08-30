"use server";

import { Location } from "@/lib/types";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
import { getServerAuthSession } from "./auth";

export async function addPoints(location: Location, points: number) {
    console.log("adding", points, "points to", location.createdById)
  if (!location.createdBy) return;
  await db
    .update(users)
    .set({ pointsFromImages: location.createdBy?.pointsFromImages + points })
    .where(eq(users.id, location.createdById))
    .execute();
  const session = await getServerAuthSession();
  if (!session) return;
  const user = session.user;
  await db
    .update(users)
    .set({ pointsFromGuesses: user.pointsFromGuesses + points })
    .where(eq(users.id, user.id))
    .execute();
}
