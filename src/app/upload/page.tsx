"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UploadButton } from "@/components/uploadthing";
import { useUploadThing } from "@/lib/utils";
import exifr from "exifr";
import { useState } from "react";

export default function UploadPage() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      alert("uploaded successfully!");
    },
    onUploadError: () => {
      alert("error occurred while uploading");
    },
    onUploadBegin: () => {
      alert("upload has begun");
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
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
