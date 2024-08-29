import { DBUser } from "@/server/db/schema";

export type Coords = {
  lat: number;
  lng: number;
};

export type Location = {
  latLng: Coords;
  img: string;
  createdBy?: DBUser;
};