"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Create a custom icon for the pet hotel and user location
const createCustomIcon = (iconUrl: string, text?: string) => {
  return L.divIcon({
    className: "custom-icon",
    html: `
      <div style="position: relative; width: 60px; height: 60px;">
        <img src="${iconUrl}" style="width: 100%; height: 100%; object-fit: contain;" />
        ${
          text
            ? `<span style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); white-space: nowrap; background: white; padding: 2px 4px; border-radius: 4px; font-weight: bold;">${text}</span>`
            : ""
        }
      </div>
    `,
    iconSize: [50, 50],
    iconAnchor: [20, 60],
    popupAnchor: [0, -40],
  });
};

const petHotelIcon = createCustomIcon("/BigPawsLogo.png");
const userLocationIcon = createCustomIcon("/you-are-here.png", "You");

function ChangeView({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

function LocationMarker({
  setUserLocation,
}: {
  setUserLocation: (location: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      setUserLocation([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
}

interface MapComponentProps {
  userLocation: [number, number] | null;
  petHotelLocation: [number, number];
  route: [number, number][];
  setUserLocation: (location: [number, number]) => void;
}

export default function MapComponent({
  userLocation,
  petHotelLocation,
  route,
  setUserLocation,
}: MapComponentProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/images/marker-icon-2x.png",
        iconUrl: "/images/marker-icon.png",
        shadowUrl: "/images/marker-shadow.png",
      });
    }
  }, []);

  return (
    <MapContainer
      center={petHotelLocation}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {userLocation && (
        <>
          <Marker position={userLocation} icon={userLocationIcon}>
            <Popup>Your Location</Popup>
          </Marker>
          <ChangeView center={userLocation} zoom={13} />
        </>
      )}
      <Marker position={petHotelLocation} icon={petHotelIcon}>
        <Popup>Big Paws Pet Hotel</Popup>
      </Marker>
      {route.length > 0 && <Polyline positions={route} color="blue" />}
      <LocationMarker setUserLocation={setUserLocation} />
    </MapContainer>
  );
}
