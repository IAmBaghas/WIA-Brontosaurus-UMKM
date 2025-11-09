"use client";

import dynamic from "next/dynamic";
import React from "react";

const MapContent = dynamic(() => import("./MapContent"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-5xl mx-auto my-10 h-[500px] flex items-center justify-center rounded-lg bg-gray-100 text-gray-500">
      Loading map...
    </div>
  ),
});

export default function UMKMMap({
  selectedCategory,
  onSelectPlace,
}: {
  selectedCategory?: string;
  onSelectPlace?: (id: number) => void;
}) {
  return <MapContent selectedCategory={selectedCategory} onSelectPlace={onSelectPlace} />;
}
