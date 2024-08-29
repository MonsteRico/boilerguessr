import { createContext } from "react";

export const GameContext = createContext<{
  userPosition: null | {
    lat: number;
    lng: number;
  };
  setUserPosition: (
    userPosition: null | {
      lat: number;
      lng: number;
    },
  ) => void;
  view: "guess" | "answer";
  setView: (view: "guess" | "answer") => void;
  location: null | {
    latLng: { lat: number; lng: number };
    img: string;
  };
}>({
  userPosition: null,
  setUserPosition: (
    userPosition: null | {
      lat: number;
      lng: number;
    },
  ) => {},
  view: "guess",
  setView: (view: "guess" | "answer") => {},
  location: null,
});
