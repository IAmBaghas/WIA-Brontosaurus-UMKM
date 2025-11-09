"use client";

import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from "react-leaflet";
import { Icon, LatLngExpression } from "leaflet";
import { Umkm } from "@/data/umkmData";

const umkmIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

type Props = {
  selectedCategory?: string;
  displayedData?: Umkm[]; 
  onSelectPlace?: (id: number | null) => void;
};

function MapClickReset({ onReset }: { onReset: () => void }) {
  useMapEvent("click", () => onReset());
  return null;
}

export default function MapContent({
  displayedData = [], 
  onSelectPlace,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const uid = useId();
  const mapRef = useRef<any | null>(null);
  const mapKey = useMemo(() => `umkm-map-${uid}-${Math.random().toString(36).slice(2, 9)}`, [uid]);

  useEffect(() => setMounted(true), []);

  const bounds = useMemo(() => {
    if (!Array.isArray(displayedData) || displayedData.length === 0) return null;
    return displayedData
      .filter((p) => p.lat && p.lng)
      .map((p) => [p.lat as number, p.lng as number]);
  }, [displayedData]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !bounds) return;
    if (bounds.length === 1) {
      map.setView(bounds[0] as LatLngExpression, 15, { animate: true });
    } else if (bounds.length > 1) {
      try {
        map.fitBounds(bounds as LatLngExpression[], {
          padding: [60, 60],
          maxZoom: 16,
          animate: true,
        });
      } catch {
        map.setView(bounds[0] as LatLngExpression, 14);
      }
    }
  }, [bounds]);

  if (!mounted) {
    return (
      <div className="w-full max-w-5xl mx-auto my-10 h-[500px] flex items-center justify-center rounded-lg bg-gray-100 text-gray-500">
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
        scrollWheelZoom
        className="w-full h-full"
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <MapClickReset onReset={() => onSelectPlace?.(null)} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {displayedData.map(
          (place) =>
            place.lat &&
            place.lng && (
              <Marker
                key={place.id}
                position={[place.lat, place.lng]}
                icon={umkmIcon}
                eventHandlers={{
                  click: () => onSelectPlace?.(place.id),
                }}
              >
                <Popup>
                  <div className="text-sm font-semibold">{place.name}</div>
                  <div className="text-xs text-gray-600">{place.category}</div>
                  <div className="text-xs mt-1">{place.description}</div>
                  <div className="mt-2 text-xs">{place.address}</div>
                  {place.contact && (
                    <div className="text-xs mt-1 text-gray-500">☎ {place.contact}</div>
                  )}
                </Popup>
              </Marker>
            )
        )}
      </MapContainer>
    </div>
  );
}
