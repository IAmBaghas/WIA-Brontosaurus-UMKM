"use client";

import React, { useEffect, useMemo, useState } from "react";
import HomeBanner from "./component/HomeBanner";
import UMKMMap from "./component/UMKMMap";
import HomeCard, { HomeCardSkeleton } from "./component/HomeCard";
import umkmData from "@/data/umkmData";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [limit, setLimit] = useState<number>(4);

  const categories = useMemo(() => {
    const set = new Set<string>();
    umkmData.forEach((u) => {
      if (!u.category) return;
      u.category
        .split(",")
        .map((s) => s.trim())
        .forEach((c) => set.add(c));
    });
    return ["All", ...Array.from(set)];
  }, []);

  const filteredList = useMemo(() => {
    let list = umkmData.slice();

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

    return list.sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
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
    setLimit((prev) => prev + 4);
  };
  const showMoreVisible =
    !loading && !selectedPlaceId && filteredList.length > displayed.length;

  return (
    <main className="bg-white">
      <section className="flex flex-col items-center justify-center text-center py-16 bg-white">
        {/* Headline */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Temukan UMKM di Sekitarmu</h1>

        {/* Subtext */}
        <p className="text-gray-500 mb-8">Dukung UMKM Lokal di Lingkungan Kampusmu</p>

        {/* Search bar */}
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
        <h2 className="text-2xl font-semibold mb-[-30px]">UMKM Sekitar Sini</h2>
      </section>

      {/* UMKM Map */}
      <section className="container mx-auto px-4">
        <UMKMMap
          selectedCategory={selectedCategory}
          onSelectPlace={(id) => setSelectedPlaceId(id)}
        />
      </section>

      {/* Category */}
      <section className="container mx-auto px-4 pb-2 max-w-5xl">
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <a
                  key={cat}
                  onClick={() => !loading && handleCategorySelect(cat)}
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded text-sm font-medium transition-colors cursor-pointer select-none
                    ${
                      isActive
                        ? "bg-[#204564] text-white hover:bg-[#3e607d]"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                    }
                    ${loading ? "opacity-50 pointer-events-none" : ""}
                  `}
                >
                  {cat}
                </a>
              );
            })}
          </div>
        </div>

        {/* Cards */}
        <div
          className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 transition-opacity duration-300 ${
            loading ? "opacity-60" : "opacity-100"
          }`}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <HomeCardSkeleton key={i} />)
            : displayed.length === 0 ? (
                <div className="col-span-full text-gray-500">
                  Tidak ada UMKM untuk kategori ini.
                </div>
              ) : (
                displayed.map((item) => <HomeCard key={item.id} item={item} />)
              )}
        </div>

        {/* Show more */}
        {showMoreVisible && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleShowMore}
              className="bg-[#204564] hover:bg-[#3e607d] text-white px-6 py-2 rounded-md font-semibold transition-colors"
              disabled={loading}
            >
              Tampilkan lebih banyak
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
