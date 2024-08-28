import Link from "next/link";
import { env } from "@/env";
import { Map } from "@vis.gl/react-google-maps";
import MapContainer from "@/components/map";

export default function HomePage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-12 px-4 py-16">
      <h1>Boilerguessr</h1>
      <div className="absolute right-1 bottom-1 hover:w-[48rem] hover:h-[30rem] w-[24rem] h-[15rem] transition-all duration-300">
        <MapContainer />
      </div>
    </main>
  );
}
