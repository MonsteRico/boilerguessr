import { DBLocation, DBUser } from "@/server/db/schema";

export type Coords = {
  lat: number;
  lng: number;
};

export type Location = DBLocation & {
  createdBy?: DBUser;
};