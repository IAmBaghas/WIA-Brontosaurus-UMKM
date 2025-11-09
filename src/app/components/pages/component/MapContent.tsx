"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import umkmData from "@/data/umkmData";
import type { LatLngExpression } from "leaflet";

const umkmIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

type Props = {
  selectedCategory?: string;
};

export default function MapContent({ selectedCategory }: Props) {
  const [mounted, setMounted] = useState(false);
  const uid = useId();
  const mapKey = useMemo(
    () => `umkm-map-${uid}-${Math.random().toString(36).slice(2, 9)}`,
    [uid]
  );

  const mapRef = useRef<any | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredPlaces = useMemo(() => {
    if (!selectedCategory || selectedCategory === "All") return umkmData.filter(p => p.lat && p.lng);
    const sel = selectedCategory.toLowerCase();
    return umkmData.filter((p) => {
      if (!p.category) return false;
      return p.category
        .toLowerCase()
        .split(",")
        .map((s) => s.trim())
        .includes(sel) && p.lat && p.lng;
    });
  }, [selectedCategory]);

  const bounds = useMemo(() => {
    if (!filteredPlaces || filteredPlaces.length === 0) return null;
    const pts: LatLngExpression[] = filteredPlaces.map((p) => [p.lat as number, p.lng as number]);
    return pts;
  }, [filteredPlaces]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (bounds && bounds.length > 0) {
      if (bounds.length === 1) {
        map.setView(bounds[0] as LatLngExpression, 15, { animate: true });
      } else {
        try {
          map.fitBounds(bounds as LatLngExpression[], { padding: [60, 60], maxZoom: 16, animate: true });
        } catch (e) {
          map.setView(bounds[0] as LatLngExpression, 14, { animate: true });
        }
      }
    } else {
      map.setView([-6.365, 106.828], 14, { animate: true });
    }
  }, [bounds]);

  if (!mounted) {
    return (
      <div className="w-full max-w-5xl mx-auto my-10 h-[500px] rounded-lg overflow-hidden shadow bg-gray-100 flex items-center justify-center text-gray-500">
        Loading map...
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto my-10 h-[500px] rounded-lg overflow-hidden shadow">
      <MapContainer
        key={mapKey}
        center={[-6.365, 106.828]}
        zoom={14}
        scrollWheelZoom={true}
        className="w-full h-full"
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {filteredPlaces.map((place) => (
          <Marker key={place.id} position={[place.lat as number, place.lng as number]} icon={umkmIcon}>
            <Popup>
              <div className="text-sm font-semibold">{place.name}</div>
              <div className="text-xs text-gray-600">{place.category}</div>
              <div className="text-xs mt-1">{place.description}</div>
              <div className="mt-2 text-xs">{place.address}</div>
              {place.contact && <div className="text-xs mt-1 text-gray-500">☎ {place.contact}</div>}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
