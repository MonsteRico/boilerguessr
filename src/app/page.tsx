import Link from "next/link";
import { env } from "@/env";
import { Map } from "@vis.gl/react-google-maps";
import Views from "@/components/views";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Views />
    </main>
  );
}
