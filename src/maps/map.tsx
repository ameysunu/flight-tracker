import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "../fonts.css";
import { useLocation } from "react-router-dom";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2Fwb2JvIiwiYSI6ImNrbjRmd2FjZzFwNnEycHBjeWhrOTcycjIifQ.KiH7aVPstXPKh0kGe4yDvw";

const Map = () => {
  let mapdetails = useLocation<{
    iata: string;
    latt: number;
    long: number;
  }>();

  const mapContainerRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [mapdetails.state.long, mapdetails.state.latt],
      zoom: 11,
    });
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
