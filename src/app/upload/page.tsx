"use client";

import { useToast } from "@/components/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/components/uploadthing";
import { useUploadThing } from "@/lib/utils";
import exifr from "exifr";
import { useSession } from "next-auth/react";
import { title } from "process";
import { useState } from "react";

export default function UploadPage() {
  const { toast } = useToast();
  const { data: session } = useSession();
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      toast({
        title: "Uploaded successfully!",
      });
    },
    onUploadError: () => {
      toast({
        title: "Error occurred while uploading!",
        variant: "destructive",
      });
    },
    onUploadBegin: () => {
      toast({
        title: "Starting upload, hang tight!",
      });
    },
  });

  if (!session)
    return (
      <main className="flex flex-col items-center justify-between p-24">
        <div className="text-center text-4xl font-bold">
          Please login to upload. You shouldn't have gotten here anyways :D
        </div>
      </main>
    );

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Input
        type="file"
        onChange={async (e) => {
          const files = e.target.files;
          if (!files) return;
          const file = files[0];
          if (!file) return;

          try {
            const { latitude, longitude } = await exifr.gps(
              await file.arrayBuffer(),
            );
            console.log("Latitude: ", latitude);
            console.log("Longitude: ", longitude);
            setLatitude(latitude);
            setLongitude(longitude);
            setFile(file);
          } catch (e: any) {
            console.log(e.message);
            alert(
              "The image you uploaded does not have GPS data. We can't verify the location!",
            );
          }
        }}
      />
      <Button
        variant={"default"}
        disabled={!file || !latitude || !longitude}
        onClick={() => {
          if (!file || !latitude || !longitude) return;
          console.log("latitude", latitude);
          console.log("longitude", longitude);
          startUpload([file], {
            latitude,
            longitude,
          });
        }}
      >
        Upload
      </Button>
    </main>
  );
}
