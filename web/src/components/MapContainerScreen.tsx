"use client";
import { icon, LatLngTuple, map, marker, polyline, tileLayer } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  origin: LatLngTuple;
  destination: LatLngTuple;
}

export default function MapContainerScreen({
  destination,
  origin,
  ...props
}: Props) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (origin && destination) {
      const leafletMap = map("map").setView([...origin], 10);

      tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(leafletMap);

      const originIcon = icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      const destinationIcon = icon({
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      });

      marker(origin, { icon: originIcon })
        .addTo(leafletMap)
        .bindPopup("Origem");

      marker(destination, { icon: destinationIcon })
        .addTo(leafletMap)
        .bindPopup("Destino");

      const route = polyline([origin, destination], {
        color: "blue",
        weight: 4,
        opacity: 0.8,
      }).addTo(leafletMap);

      leafletMap.fitBounds(route.getBounds());

      return () => {
        leafletMap.remove();
      };
    }
  }, [origin, destination]);

  return <div id="map" {...props} />;
}
