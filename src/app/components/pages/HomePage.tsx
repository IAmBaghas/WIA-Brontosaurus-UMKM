"use client";

import React, { useEffect, useMemo, useState } from "react";
import HomeBanner from "./component/HomeBanner";
import UMKMMap from "./component/UMKMMap";
import HomeCard, { HomeCardSkeleton } from "./component/HomeCard";
import umkmData from "@/data/umkmData";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { Button } from "@mui/joy";

// Universitas Indonesia
const DEFAULT_CENTER = { lat: -6.365, lng: 106.828 };

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);  
  const [showMoreLoading, setShowMoreLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(4);

  const categories = useMemo(() => {
    const set = new Set<string>();
    umkmData.forEach((u) => {
      if (!u.category) return;
      u.category.split(",").map((s) => s.trim()).forEach((c) => set.add(c));
    });
    return ["All", ...Array.from(set)];
  }, []);

  const filteredList = useMemo(() => {
    let list = umkmData
      .filter((u) => u.lat && u.lng)
      .map((u) => ({
        ...u,
        distance: getDistance(DEFAULT_CENTER.lat, DEFAULT_CENTER.lng, u.lat!, u.lng!),
      }));

    if (selectedCategory !== "All") {
      const sel = selectedCategory.toLowerCase();
      list = list.filter((u) =>
        (u.category ?? "")
          .toLowerCase()
          .split(",")
          .map((s) => s.trim())
          .includes(sel)
      );
    }

    return list.sort((a, b) => a.distance - b.distance);
  }, [selectedCategory]);

  const displayed = useMemo(() => {
    if (selectedPlaceId) {
      const found = filteredList.find((u) => u.id === selectedPlaceId);
      return found ? [found] : [];
    }
    return filteredList.slice(0, limit);
  }, [filteredList, selectedPlaceId, limit]);

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(t);
  }, [selectedCategory, selectedPlaceId]);

  const handleCategorySelect = (cat: string) => {
    setSelectedPlaceId(null);
    setSelectedCategory(cat);
    setLimit(4);
  };

  const handleShowMore = () => {
  if (showMoreLoading) return;
  setShowMoreLoading(true);

  setTimeout(() => {
    setLimit((prev) => prev + 4);
    setShowMoreLoading(false);
  }, 800);
};

  const showMoreVisible =
    !loading && !selectedPlaceId && filteredList.length > displayed.length;

  return (
    <main className="bg-white">
      <section className="flex flex-col items-center justify-center text-center py-16 bg-white">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Temukan UMKM di Sekitarmu</h1>
        <p className="text-gray-500 mb-8">Dukung UMKM Lokal di Lingkungan Kampusmu</p>

        <div className="flex items-center bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 w-full max-w-xl">
          <input
            type="text"
            disabled
            placeholder="Universitas Indonesia"
            className="w-full px-3 py-3 text-gray-400 bg-transparent focus:outline-none cursor-not-allowed"
          />
          <button disabled className="bg-[#204564] text-white font-semibold px-6 py-3 rounded-r-lg cursor-not-allowed">
            Cari
          </button>
        </div>
      </section>

      {/* Banner */}
      <section className="pb-10">
        <HomeBanner />
      </section>

      {/* Title */}
      <section className="container mx-auto py-8 max-w-5xl">
        <h2 className="text-2xl font-semibold mb-[-30px]">UMKM Terdekat</h2>
      </section>

      {/* Map */}
      <section className="container mx-auto px-4">
        <UMKMMap
          selectedCategory={selectedCategory}
          displayedData={displayed} 
          onSelectPlace={(id) => setSelectedPlaceId(id)}
        />
      </section>

      {/* UMKM */}
      <section className="container mx-auto px-4 pb-2 max-w-5xl">
        <div className="flex flex-wrap items-center justify-between mb-6 gap-3">

          {/* Category Dropdown */}
          <div className="w-48">
            <Select
              size="sm"
              variant="outlined"
              color="neutral"
              value={selectedCategory}
              onChange={(_, value) => value && handleCategorySelect(value)}
              disabled={loading}
              sx={{
                width: "12rem",
                borderRadius: "8px",
                fontSize: "0.875rem",
                backgroundColor: "white",
                color: "#204564",
                "&:hover": {
                  backgroundColor: "#f9fafb",
                },
                "& .MuiSelect-indicator": {
                  color: "#204564",
                },
              }}
            >
              {categories.map((cat) => (
                <Option
                  key={cat}
                  value={cat}
                  sx={{
                    fontWeight: selectedCategory === cat ? 600 : 500,
                    backgroundColor: selectedCategory === cat ? "#204564" : "white",
                    color: selectedCategory === cat ? "white" : "#204564",
                    "&:hover": {
                      backgroundColor: "#204564",
                      color: "white",
                    },
                    "&.Mui-selected": {
                      backgroundColor: "#204564 !important",
                      color: "white !important",
                    },
                  }}
                >
                  {cat === "All" ? "Semua" : cat}
                </Option>
              ))}
            </Select>
          </div>

          {/* Show More */}
          <button
            onClick={handleShowMore}
            disabled={loading || showMoreLoading || filteredList.length <= displayed.length}
            className={`text-sm font-medium px-4 py-1.5 rounded-md border transition-colors ${
              loading || showMoreLoading || filteredList.length <= displayed.length
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#204564] text-white hover:bg-[#3e607d]"
            }`}
          >
            {showMoreLoading
              ? "Memuat..."
              : filteredList.length <= displayed.length
              ? "Tidak ada lagi"
              : "Tampilkan lebih banyak"}
          </button>
        </div>

        {/* Cards Grid */}
        <div
          className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 transition-opacity duration-300 ${
            loading || showMoreLoading ? "opacity-60" : "opacity-100"
          }`}
        >
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <HomeCardSkeleton key={i} />)
          ) : displayed.length === 0 ? (
            <div className="col-span-full text-gray-500">
              Tidak ada UMKM untuk kategori ini.
            </div>
          ) : (
            <>
              {displayed.map((item) => (
                <HomeCard key={item.id} item={item} />
              ))}

              {showMoreLoading &&
                Array.from({ length: 4 }).map((_, i) => (
                  <HomeCardSkeleton key={`load-${i}`} />
                ))}
            </>
          )}
        </div>
      </section>

    </main>
  );
}
