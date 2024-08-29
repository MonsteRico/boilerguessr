"use client";
import React, { useState } from "react";
import { GameContext } from "./context";
import GuessView from "./guessView";
import AnswerView from "./answerView";
import { Coords, Location } from "@/lib/types";
// { lat: 40.43428013133348, lng: -86.9184942972941 }
function Views({ firstLocation, secondLocation }: { firstLocation: Location, secondLocation: Location }) {

  const [userPosition, setUserPosition] = useState<null | Coords>(null);
  const [view, setView] = useState<"guess" | "answer">("guess");
  const [currentLocation, setCurrentLocation] = useState<Location | null>(
    firstLocation,
  );
  const [nextLocation, setNextLocation] = useState<null | Location>(secondLocation);

  return (
    <GameContext.Provider
      value={{
        userPosition,
        setUserPosition,
        view: "guess",
        setView,
        currentLocation,
        setCurrentLocation,
        nextLocation,
        setNextLocation,
      }}
    >
      {view === "guess" ? <GuessView /> : <AnswerView />}
    </GameContext.Provider>
  );
}

export default Views;
