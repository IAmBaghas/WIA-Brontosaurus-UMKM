"use client";

import React from "react";
import Image from "next/image";
import type { Umkm } from "@/data/umkmData";

export default function HomeCard({ item }: { item: Umkm }) {
  const imgSrc = item.gallery?.[0] ?? "/assets/placeholder-card.jpg";

  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
      {/* image */}
      <div className="relative w-full h-44 md:h-40 lg:h-44 bg-gray-100">
        <Image
          src={imgSrc}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 600px, 300px"
          priority={false}
        />

        {/* category */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 text-xs text-gray-800 px-2 py-1 rounded-md font-medium">
            {item.category}
          </span>
        </div>
      </div>

      {/* content */}
      <div className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-sm md:text-base font-semibold text-gray-800 leading-tight min-h-12">
              {item.name}
            </h3>

            <p className="text-xs text-gray-500 mt-1 line-clamp-2 min-h-12">
              {item.address ?? item.description}
            </p>
          </div>

        </div>

        {/* price */}
        <div className="mt-3">

          <div className="mt-1 text-lg md:text-base font-extrabold text-gray-900">
            {item.priceRange ?? "Harga bervariasi"}
          </div>

        </div>

        {/* button */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <a
            href={item.mapsUrl ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border px-3 py-1 rounded text-xs text-gray-700 hover:bg-gray-50"
          >
            Lokasi
          </a>
        </div>
      </div>
    </article>
  );
}
