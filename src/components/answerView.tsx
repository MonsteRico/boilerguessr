"use client";
import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "./context";
import { Map, Marker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { cn, distanceToPoints, latLng } from "@/lib/utils";
import { Button } from "./ui/button";
import { Location } from "@/lib/types";
import { getRandomLocation } from "@/server/getRandomLocation";
import { useSession } from "next-auth/react";
import { addPoints } from "@/server/addPoints";
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
  const { update, data: session } = useSession();
  useEffect(() => {
    if (!map || !currentLocation || !userPosition) return;
    const bounds = new google.maps.LatLngBounds();
    bounds.extend(latLng(currentLocation));
    bounds.extend(userPosition);
    map.fitBounds(bounds);

    // Create a dashed line (Polyline) between the points
    const line = new google.maps.Polyline({
      path: [latLng(currentLocation), userPosition],
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

    const currentLatLng = latLng(currentLocation);

    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      currentLatLng,
      userPosition,
    );
    const distanceInMiles = distance / 1609.34;
    const points = distanceToPoints(distanceInMiles);


    const midPoint = new google.maps.LatLng(
      (currentLatLng.lat + userPosition.lat) / 2,
      (currentLatLng.lng + userPosition.lng) / 2,
    );

    const infoWindow = new google.maps.InfoWindow({
      headerContent: `Distance: ${distanceInMiles.toFixed(2)} miles`,
      content: `Points: ${points}`,
      position: midPoint,
    });

    infoWindow.open(map);

    setLoadingMap(false);
  }, [map]);


  useEffect(() => {
    if (!currentLocation || !userPosition) return;
    const currentLatLng = latLng(currentLocation);

    const distance = google.maps.geometry.spherical.computeDistanceBetween(
      currentLatLng,
      userPosition,
    );
    const distanceInMiles = distance / 1609.34;
    const points = distanceToPoints(distanceInMiles);
    addPoints(currentLocation, points);
    if (!session) return;
    update({
      pointsFromGuesses: session.user.pointsFromGuesses + points,
    });
  }, []);

  if (!currentLocation || !userPosition) return <div>Loading...</div>;

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
        <h1>Num Likes: {currentLocation.likes}</h1>
        <h1>Num Dislikes: {currentLocation.dislikes}</h1>
        {!loadingMap && (
          <Map
            style={{ width: "100%", height: "100%" }}
            defaultCenter={{ lat: 40.426762478973345, lng: -86.91375237222384 }}
            defaultZoom={18}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            clickableIcons={false}
          >
            {userPosition && <Marker position={userPosition} />}
            <Marker position={latLng(currentLocation)} />
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
