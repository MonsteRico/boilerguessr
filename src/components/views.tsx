"use client";
import React, { useState } from "react";
import { GameContext } from "./context";
import GuessView from "./guessView";
import AnswerView from "./answerView";

function Views() {
    const [userPosition, setUserPosition] = useState<null | {
    lat: number;
    lng: number;
  }>(null);
  const [view, setView] = useState<"guess" | "answer">("guess");
    const location = {
      latLng: { lat: 40.428487474180784, lng: -86.91407616609314 },
      img: "https://upload.wikimedia.org/wikipedia/commons/0/01/Purdue_Engineering_Fountain.JPG",
    };
  return (
    <GameContext.Provider value={{
        userPosition,
        setUserPosition,
        view: "guess",
        setView,
        location,
    }}>
      {view === "guess" ? <GuessView /> : <AnswerView />}
    </GameContext.Provider>
  );
}

export default Views;
