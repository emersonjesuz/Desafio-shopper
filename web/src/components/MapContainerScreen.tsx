"use client";
import { Icon, LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export function MapContainerScreen({ ...props }: Props) {
  const saoPaulo: LatLngTuple = [-23.55052, -46.633308];
  const campinas: LatLngTuple = [-22.909938, -47.062633];
  const route: LatLngTuple[] = [saoPaulo, campinas];

  return (
    <MapContainer
      center={[-23.0, -46.8]}
      zoom={8}
      scrollWheelZoom={false}
      {...props}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker
        position={saoPaulo}
        icon={
          new Icon({
            iconUrl:
              "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
            shadowUrl:
              "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
            html: `<div style="font-size: 24px; color: blue;">${FaMapMarkerAlt}</div>`,
          })
        }
      >
        <Popup>São Paulo</Popup>
      </Marker>

      <Marker
        position={campinas}
        icon={
          new Icon({
            iconUrl:
              "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
            shadowUrl:
              "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
            html: `<div style="font-size: 24px; color: blue;">${FaMapMarkerAlt}</div>`,
          })
        }
      >
        <Popup>Campinas</Popup>
      </Marker>

      <Polyline positions={route} color="blue" />
    </MapContainer>
  );
}
