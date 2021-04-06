import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";

import "../fonts.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2Fwb2JvIiwiYSI6ImNrbjRmd2FjZzFwNnEycHBjeWhrOTcycjIifQ.KiH7aVPstXPKh0kGe4yDvw";

const Map = () => {
  const mapContainerRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-104.9876, 39.7405],
      zoom: 12.5,
    });
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div className="map-container" ref={mapContainerRef} />;
};

export default Map;
