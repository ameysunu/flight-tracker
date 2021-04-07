import React, { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "../fonts.css";
import { Link, useLocation } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";

mapboxgl.accessToken = String(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);

const Map = () => {
  let mapdetails = useLocation<{
    iata: string;
    latt: number;
    long: number;
    name: string;
  }>();

  const mapContainerRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [mapdetails.state.long, mapdetails.state.latt],
      zoom: 12,
    });
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        style={{ backgroundColor: "#212121" }}
        variant="dark"
      >
        <Navbar.Brand>{mapdetails.state.name}</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/routes" className="nav-link">
              {" "}
              Back{" "}
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Map;
