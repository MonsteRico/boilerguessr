import Link from "next/link";
import { env } from "@/env";
import { Map } from "@vis.gl/react-google-maps";
import Views from "@/components/views";
import { getRandomLocation } from "@/server/getRandomLocation";

export default async function HomePage() {
  const firstLocation = await getRandomLocation();
  const secondLocation = await getRandomLocation();
  return (
    <main className="flex flex-col items-center justify-center">
      <Views firstLocation={firstLocation} secondLocation={secondLocation} />
    </main>
  );
}
