"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { LatLngExpression } from "leaflet";

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });

import { Icon } from "leaflet";

const defaultIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

type Props = {
  lat?: number | null;
  lng?: number | null;
  name?: string;
  mapKey?: string | number;
};

export default function MapPreview({ lat, lng, name, mapKey }: Props) {
  const [ready, setReady] = useState(false);
  const createdMapRef = useRef<any | null>(null);

  if (!lat || !lng) {
    return (
      <div className="w-full h-56 md:h-64 rounded overflow-hidden border bg-gray-100 flex items-center justify-center text-gray-500">
        Lokasi tidak tersedia
      </div>
    );
  }

  useEffect(() => {
    let raf = 0;
    const t = window.setTimeout(() => {
      raf = window.requestAnimationFrame(() => {
        setReady(true);
      });
    }, 40); 
    return () => {
      clearTimeout(t);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const center: LatLngExpression = [lat, lng];

  const uniqueKey = `${mapKey ?? lat}-${lng}-${ready ? "1" : "0"}`;

  const onWhenCreated = (mapInstance: any) => {
    createdMapRef.current = mapInstance;
    setTimeout(() => {
      try {
        mapInstance.invalidateSize(true);
      } catch {
        // ignore 
      }
    }, 60);
  };

  if (!ready) {
    return <div className="w-full h-56 md:h-64 rounded overflow-hidden border bg-gray-100" />;
  }

  return (
    <div className="w-full h-56 md:h-64 rounded overflow-hidden border">
      <MapContainer
        key={uniqueKey}
        center={center}
        zoom={15}
        scrollWheelZoom={false}
        className="w-full h-full"
        style={{ minHeight: 200 }}
        whenCreated={onWhenCreated}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center} icon={defaultIcon} />
      </MapContainer>
    </div>
  );
}
