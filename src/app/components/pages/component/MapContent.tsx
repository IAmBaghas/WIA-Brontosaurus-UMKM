"use client";

import React, { useEffect, useId, useMemo, useState } from "react";
import "leaflet/dist/leaflet.css"; 
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import umkmData from "@/data/umkmData";

const umkmIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

export default function MapContent() {
  const [mounted, setMounted] = useState(false);

  const uid = useId();
  const mapKey = useMemo(() => `umkm-map-${uid}-${Math.random().toString(36).slice(2, 9)}`, [uid]);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {umkmData.map((place) =>
          place.lat && place.lng ? (
            <Marker key={place.id} position={[place.lat, place.lng]} icon={umkmIcon}>
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
          ) : null
        )}
      </MapContainer>
    </div>
  );
}
