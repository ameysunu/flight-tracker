import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1Ijoia2Fwb2JvIiwiYSI6ImNrbjRmd2FjZzFwNnEycHBjeWhrOTcycjIifQ.KiH7aVPstXPKh0kGe4yDvw";
var map = new mapboxgl.Map({
  container: "YOUR_CONTAINER_ELEMENT_ID",
  style: "mapbox://styles/mapbox/streets-v11",
});
