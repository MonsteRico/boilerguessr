import { Location } from "@/lib/types";
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
  currentLocation: null | Location;
  setCurrentLocation: (currentLocation: null | Location) => void;
  nextLocation: null | Location;
  setNextLocation: (nextLocation: null | Location) => void;
  
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
  currentLocation: null,
  setCurrentLocation: (currentLocation: null | Location) => {},
  nextLocation: null,
  setNextLocation: (nextLocation: null | Location) => {},
});
