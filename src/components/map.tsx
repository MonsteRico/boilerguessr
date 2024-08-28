"use client";
import {
  AdvancedMarker,
  Map,
  MapControl,
  Marker,
} from "@vis.gl/react-google-maps";
import React, { useState } from "react";

function MapContainer() {
  const [userPosition, setUserPosition] = useState<null | {
    lat: number;
    lng: number;
  }>(null);

  return (
    <Map
      onClick={(e) => {
        setUserPosition(e.detail.latLng);
        console.log(e.map);
        console.log(e.map.getZoom());
      }}
      style={{ width: "100%", height: "100%" }}
      defaultCenter={{ lat: 40.426762478973345, lng: -86.91375237222384 }}
      defaultZoom={14}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
    >
      {userPosition && <Marker position={userPosition} />}
    </Map>
  );
}

export default MapContainer;
