import { getServerAuthSession } from "@/server/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import exifr from "exifr";
import { z } from "zod";
import { UploadedFileData } from "uploadthing/types";
import { db } from "@/server/db";
import { locations } from "@/server/db/schema";
const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "16MB" } })
    .input(
      z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
    )
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req, input }) => {
      // This code runs on your server before upload
      const session = await getServerAuthSession();
      console.log(session);
      if (!session) throw new UploadThingError("Unauthorized");
      const user = session.user;
      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return {
        userId: user.id,
        latitude: input.latitude,
        longitude: input.longitude,
      };
    })
    .onUploadComplete(
      async ({
        metadata,
        file,
      }: {
        metadata: { userId: string; latitude: number; longitude: number };
        file: UploadedFileData;
      }) => {
        // This code RUNS ON YOUR SERVER after upload
        console.log("Upload complete for userId:", metadata.userId);

        console.log("file url", file.url);

        console.log("file", file);
        console.log("metadata", metadata);

        await db.insert(locations).values({
          latitude: metadata.latitude.toString(),
          longitude: metadata.longitude.toString(),
          imgUrl: file.url,
          createdById: metadata.userId,
        });

        // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
        return { uploadedBy: metadata.userId };
      },
    ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
