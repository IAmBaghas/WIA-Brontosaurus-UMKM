"use client";

import HomeBanner from "./component/HomeBanner";
import UMKMMap from "./component/UMKMMap";

export default function HomePage() {
  return (
    <main className="bg-white">
      <section className="flex flex-col items-center justify-center text-center py-16 bg-white">
        
        {/* Headline */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Mau cari UMKM?
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 mb-8">
          Dapatkan informasinya dan temukan UMKM terbaik di sekitarmu.
        </p>

        {/* Search bar */}
        <div className="flex items-center bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 w-full max-w-xl">

          <input
            type="text"
            disabled
            placeholder="Universitas Indonesia"
            className="w-full px-3 py-3 text-gray-400 bg-transparent focus:outline-none cursor-not-allowed"
          />

          <button
            disabled
            className="bg-[#204564] text-white font-semibold px-6 py-3 rounded-r-lg cursor-not-allowed"
          >
            Cari
          </button>
        </div>
      </section>

      {/* Banner */}
      <section className="pb-10">
        <HomeBanner />
      </section>

      {/* Simple content below */}
      <section className="container mx-auto py-8 max-w-5xl">
        <h2 className="text-2xl font-semibold mb-[-30px]">UMKM Sekitar Sini</h2>
        
      </section>

      {/* UMKM Map */}
      <section className="container mx-auto px-4">
        <UMKMMap />
      </section>

    </main>
  );
}
