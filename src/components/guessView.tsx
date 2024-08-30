"use client";
import React, { useContext } from "react";
import { GameContext } from "./context";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { Button } from "./ui/button";

function GuessView() {
  const { userPosition, setUserPosition, view, setView, currentLocation } =
    useContext(GameContext);

  return (
    <>
      <div className="my-2 flex h-[95dvh] flex-col items-center gap-4">
        {currentLocation && <img src={currentLocation.imgUrl} className="h-[90%] w-full" />}
      </div>
      <div className="absolute group bottom-8 right-1 flex h-[15rem] w-[24rem] flex-col opacity-50 transition-all duration-300 hover:h-[30rem] hover:w-[48rem] hover:opacity-100">
        <Map
          onClick={(e) => {
            setUserPosition(e.detail.latLng);
            console.log(e.detail.latLng);
          }}
          style={{ width: "100%", height: "100%" }}
          defaultCenter={{ lat: 40.426762478973345, lng: -86.91375237222384 }}
          defaultZoom={14}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          clickableIcons={false}
        >
          {userPosition && <Marker position={userPosition} />}
        </Map>
        <div className="flex justify-center min-h-8">
          {userPosition && (
            <Button variant={"default"} className="group-hover:opacity-100 opacity-0 transition duration-300" onClick={() => setView("answer")}>
              Answer
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default GuessView;
