"use client";
import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "./context";
import { Map, Marker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Location } from "@/lib/types";
import { getRandomLocation } from "@/server/getRandomLocation";
function AnswerView() {
  const {
    userPosition,
    setUserPosition,
    view,
    setView,
    currentLocation,
    setCurrentLocation,
    nextLocation,
    setNextLocation,
  } = useContext(GameContext);
  const map = useMap();
  // const geometryLib = useMapsLibrary("geometry");
  const [loadingMap, setLoadingMap] = useState(true);

  useEffect(() => {
    if (!map || !currentLocation || !userPosition) return;
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(currentLocation.latLng);
    bounds.extend(userPosition);
    map.fitBounds(bounds);

    // Create a dashed line (Polyline) between the points
    const line = new google.maps.Polyline({
      path: [currentLocation.latLng, userPosition],
      strokeColor: "#000000",
      strokeOpacity: 0,
      strokeWeight: 0,
      icons: [
        {
          icon: {
            path: "M 0,-1 0,1",
            strokeOpacity: 1,
            scale: 4,
          },
          offset: "0",
          repeat: "50px",
        },
      ],
      map: map,
    });

    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      currentLocation.latLng,
      userPosition,
    );
    const distanceInMiles = distance / 1609.34;
    console.log("distance", distanceInMiles);
    const midPoint = new google.maps.LatLng(
      (currentLocation.latLng.lat + userPosition.lat) / 2,
      (currentLocation.latLng.lng + userPosition.lng) / 2,
    );

    const infoWindow = new google.maps.InfoWindow({
      headerContent: `Distance: ${distanceInMiles.toFixed(2)} miles`,
      position: midPoint,
    });

    infoWindow.open(map);

    setLoadingMap(false);
  }, [currentLocation, map]);

  if (!currentLocation || !userPosition) return <div>Loading...</div>;
  const midpoint = {
    lat: (currentLocation.latLng.lat + userPosition.lat) / 2,
    lng: (currentLocation.latLng.lng + userPosition.lng) / 2,
  };
  return (
    <>
      <div
        className={cn(
          "flex h-[90dvh] w-[90dvw] flex-col items-center justify-center transition-all duration-300",
          loadingMap && "animate-pulse bg-gray-500 duration-1000",
        )}
      >
        {currentLocation.createdBy && (
          <h1>Uploaded by: {currentLocation.createdBy.name}</h1>
        )}
        {!loadingMap && (
          <Map
            style={{ width: "100%", height: "100%" }}
            defaultCenter={midpoint}
            defaultZoom={18}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            clickableIcons={false}
          >
            {userPosition && <Marker position={userPosition} />}
            <Marker position={currentLocation.latLng} />
          </Map>
        )}
        <Button
          onClick={async () => {
            const newLocation = await getRandomLocation();
            console.log("newLocation", newLocation);
            setView("guess");
            setCurrentLocation(nextLocation);
            setNextLocation(newLocation);
            setUserPosition(null);
          }}
          className=""
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default AnswerView;
