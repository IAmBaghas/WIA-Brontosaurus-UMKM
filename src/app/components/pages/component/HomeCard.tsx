"use client";

import Image from "next/image";
import { Skeleton } from "@mui/joy";
import type { Umkm } from "@/data/umkmData";
import { ArrowBack, PinDrop } from "@mui/icons-material";

export function HomeCardSkeleton() {
  return (
    <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative w-full h-44 md:h-40 lg:h-44 bg-gray-100">
        <Skeleton variant="rectangular" width="100%" height="100%" />
      </div>

      <div className="p-3 space-y-2">
        <Skeleton variant="text" width="70%" height={20} />
        <Skeleton variant="text" width="90%" height={16} />
        <Skeleton variant="text" width="60%" height={16} />
        <div className="pt-3">
          <Skeleton variant="text" width="50%" height={20} />
        </div>
        <div className="pt-3">
          <Skeleton variant="rectangular" width={60} height={24} />
        </div>
      </div>
    </article>
  );
}

export default function HomeCard({
  item,
  onOpenDetails,
}: {
  item: Umkm;
  onOpenDetails?: (id: number) => void;
}) {
  const imgSrc = item.gallery?.[0] ?? "/assets/placeholder-card.jpg";

  return (
    <div className="relative h-[415px] w-full max-w-[427px] rounded-3xl overflow-clip bg-gray-100 shrink-0 hover:shadow-xl transition-all duration-300">
      {/* Gambar utama */}
      <Image
        src={imgSrc}
        alt={item.name}
        fill
        className="object-cover w-full h-full"
        sizes="(max-width: 1024px) 100vw, 427px"
        priority={false}
      />

      {/* Overlay bawah */}
      <div className="absolute left-6 right-6 bottom-[33px] bg-white rounded-3xl shadow-md p-6">
        {/* Info */}
        <div className="flex flex-col gap-1">
          {/* Kategori dan Rating */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
              {item.category ?? "UMKM"}
            </span>
            <div className="flex items-center">
              <Image
                src="/assets/images/icons/star.svg"
                alt="Rating"
                width={16}
                height={16}
                className="mr-1"
              />
              <p className="text-[14px] font-semibold text-yellow-500 mr-1">
                {/* {item.rating ?? "5.0"} */}
              </p>
              <p className="text-[13px] text-gray-400">
                {/* ({item.reviewCount ?? "6.6K+"}) */}
              </p>
            </div>
          </div>

          {/* Nama */}
          <h3 className="text-lg leading-[27px] font-semibold text-gray-800 mt-1">
            {item.name}
          </h3>

          {/* Alamat / Deskripsi */}
          <p className="text-sm text-gray-500 line-clamp-2">
            {item.address ?? item.description ?? "Alamat tidak tersedia"}
          </p>

          {/* Harga */}
          <p className="text-base font-semibold text-gray-700 mt-2">
            {item.priceRange ? `IDR ${item.priceRange}` : "Harga bervariasi"}
          </p>

          {/* Tombol Aksi */}
          <div className="flex gap-3 mt-4">
            {/* Tombol Lokasi */}
            <a
              href={item.mapsUrl ?? "#"}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center h-9 w-full rounded-xl bg-[#204564] hover:bg-[#3e607d] transition-all duration-300"
            >
              <PinDrop className="text-white mr-2" />
              <span className="text-white font-semibold text-sm">Lokasi</span>
            </a>

            {/* Tombol Detail */}
            <button
              onClick={() => onOpenDetails?.(item.id)}
              className="flex items-center justify-center h-9 w-full rounded-xl bg-[#204564] hover:bg-[#3e607d] transition-all duration-300"
            >
              <ArrowBack className="text-white mr-2" />
              <span className="text-white font-semibold text-sm">Detail</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
