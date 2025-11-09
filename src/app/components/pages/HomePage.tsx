"use client";

import React, { useEffect, useMemo, useState } from "react";
import HomeBanner from "./component/HomeBanner";
import UMKMMap from "./component/UMKMMap";
import HomeCard, { HomeCardSkeleton } from "./component/HomeCard";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import umkmData from "@/data/umkmData";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(false);

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

  const displayed = useMemo(() => {
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
    return list.sort((a, b) => (b.id ?? 0) - (a.id ?? 0)).slice(0, 4);
  }, [selectedCategory]);

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(t);
  }, [selectedCategory]);

  return (
    <main className="bg-white">
      <section className="flex flex-col items-center justify-center text-center py-16 bg-white">
        {/* Headline */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Mau cari UMKM?</h1>

        {/* Subtext */}
        <p className="text-gray-500 mb-8">Dapatkan informasinya dan temukan UMKM terbaik di sekitarmu.</p>

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
        <UMKMMap />
      </section>

      {/* Category */}
      <section className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6">
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <Button
                  key={cat}
                  variant={isActive ? "solid" : "outlined"}
                  color={isActive ? "primary" : "neutral"}
                  size="sm"
                  disabled={loading}
                  onClick={() => setSelectedCategory(cat)}
                  sx={{
                    textTransform: "none",
                    borderRadius: 2,
                    px: 2,
                    py: 0.5,
                  }}
                >
                  {cat}
                </Button>
              );
            })}
          </Stack>
        </div>

        <div
          className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 transition-opacity duration-300 ${
            loading ? "opacity-60" : "opacity-100"
          }`}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <HomeCardSkeleton key={i} />)
            : displayed.length === 0 ? (
                <div className="col-span-full text-gray-500">Tidak ada UMKM untuk kategori ini.</div>
              ) : (
                displayed.map((item) => <HomeCard key={item.id} item={item} />)
              )}
        </div>
      </section>
    </main>
  );
}
