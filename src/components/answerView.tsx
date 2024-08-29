"use client";
import React, { useContext, useEffect, useState } from "react";
import { GameContext } from "./context";
import { Map, Marker, useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { cn } from "@/lib/utils";

function AnswerView() {
    const {userPosition, setUserPosition, view, setView, location} = useContext(GameContext);
    const map = useMap();
    // const geometryLib = useMapsLibrary("geometry");
    const [loadingMap, setLoadingMap] = useState(true);

    useEffect(() => {
      if (!map || !location || !userPosition) return;
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(location.latLng);
      bounds.extend(userPosition);
      map.fitBounds(bounds);

      // Create a dashed line (Polyline) between the points
      const line = new google.maps.Polyline({
        path: [location.latLng, userPosition],
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

      const distance = google.maps.geometry.spherical.computeDistanceBetween(location.latLng, userPosition);
      const distanceInMiles = distance / 1609.34;
      console.log("distance", distanceInMiles);
      const midPoint = new google.maps.LatLng(
        (location.latLng.lat + userPosition.lat) / 2,
        (location.latLng.lng + userPosition.lng) / 2,
      );

      const infoWindow = new google.maps.InfoWindow({

        headerContent: `Distance: ${distanceInMiles.toFixed(2)} miles`,
        position: midPoint,
      });

      infoWindow.open(map);

      setLoadingMap(false);
    }, [location, map]);

    if (!location || !userPosition) return <div>Loading...</div>;
    const midpoint = {
        lat: (location.latLng.lat + userPosition.lat) / 2,
        lng: (location.latLng.lng + userPosition.lng) / 2,
    }
  return (
    <>
      <div className={cn("h-[90dvh] w-[90dvw] transition-all duration-300", loadingMap && "animate-pulse bg-gray-500 duration-1000")}>
        {!loadingMap && <Map
          style={{ width: "100%", height: "100%" }}
          defaultCenter={midpoint}
          defaultZoom={18}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          clickableIcons={false}
        >
          {userPosition && <Marker position={userPosition} />}
          <Marker position={location.latLng} />
        </Map>}
      </div>
    </>
  );
}

export default AnswerView;
