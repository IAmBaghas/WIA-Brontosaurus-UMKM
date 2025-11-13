"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Image from "next/image";
import type { Umkm } from "@/data/umkmData";

const MapPreview = dynamic(() => import("./MapPreview"), { ssr: false });

type Props = {
  open: boolean;
  onClose: () => void;
  item?: Umkm | null;
};

export default function UMKMModal({ open, onClose, item }: Props) {
  const [index, setIndex] = useState(0);

  if (!item) return null;

  const gallery =
    item.gallery && item.gallery.length > 0
      ? item.gallery
      : ["/assets/placeholder-card.jpg"];

  const prev = () => setIndex((i) => (i - 1 + gallery.length) % gallery.length);
  const next = () => setIndex((i) => (i + 1) % gallery.length);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="umkm-modal-title"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 1.5, md: 3 },
      }}
    >
      <div
        className="w-full mx-4 sm:mx-0 max-w-[95vw] sm:max-w-3xl md:max-w-5xl max-h-[95vh] overflow-y-auto bg-white rounded-lg sm:rounded-2xl shadow-2xl relative animate-fadeIn"
        role="dialog"
        aria-modal="true"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {/* Tombol Tutup */}
        <div className="absolute top-4 right-4 z-10">
          <ModalClose sx={{ bgcolor: "white", borderRadius: "50%" }} />
        </div>

        {/* Header */}
        <div className="px-5 pt-6 md:px-8">
          <Breadcrumbs separator="›" aria-label="breadcrumb" className="!text-sm">
            <span className="text-gray-500">
              {item.category ?? "UMKM"}
            </span>
            <span className="text-sm text-gray-800 font-medium">
              {item.name}
            </span>
          </Breadcrumbs>

          <h2
            id="umkm-modal-title"
            className="text-2xl md:text-3xl font-bold text-gray-900 mt-3"
          >
            {item.name}
          </h2>
        </div>

        {/* Konten */}
        <div className="p-5 md:p-8 flex flex-col lg:flex-row gap-8">
          {/* Galeri */}
          <div className="flex-1">
            <div className="relative w-full h-64 sm:h-80 md:h-[28rem] rounded-xl overflow-hidden bg-gray-100">
              <Image
                src={gallery[index]}
                alt={`${item.name} image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 800px"
              />

              {/* Navigasi Gambar */}
              {gallery.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow transition"
                  >
                    ‹
                  </button>

                  <button
                    onClick={next}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow transition"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
                {gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`relative h-16 w-20 sm:h-20 sm:w-24 rounded-xl overflow-hidden border-2 transition ${
                      i === index
                        ? "border-[#204564] scale-[1.03]"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <Image
                      src={g}
                      alt={`thumb-${i}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detail UMKM */}
          <div className="w-full lg:w-1/2 flex flex-col gap-5">
            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Deskripsi
              </h3>
              <p className="text-sm text-gray-800 mt-1 text-justify leading-relaxed">
                {item.description ?? "Tidak ada deskripsi."}
              </p>
            </section>

            <section>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Alamat
              </h3>
              <p className="text-sm text-gray-800 mt-1 leading-relaxed">
                {item.address ?? "-"}
              </p>
            </section>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Jam Buka
                </h4>
                <p className="text-sm text-gray-800 mt-1">{item.hours ?? "-"}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Kontak
                </h4>
                <p className="text-sm text-gray-800 mt-1">{item.contact ?? "-"}</p>
              </div>
            </div>

            <section>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Harga
              </h4>
              <p className="text-sm text-gray-800 mt-1">
                {item.priceRange ?? "Harga bervariasi"}
              </p>
            </section>

            {item.socials && (
              <section>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Sosial Media
                </h4>
                <p className="text-sm text-gray-800 mt-1">{item.socials}</p>
              </section>
            )}

            <section>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Lokasi
              </h4>
              <div className="mt-2 rounded-xl overflow-hidden border border-gray-200">
                <MapPreview
                  lat={item.lat ?? null}
                  lng={item.lng ?? null}
                  name={item.name}
                  mapKey={item.id}
                />
              </div>
            </section>

            {/* Tombol Aksi */}
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={item.mapsUrl ?? "#"}
                target="_blank"
                rel="noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[#204564] text-white hover:bg-[#3e607d] shadow-md transition-all"
              >
                🗺️ Buka di Peta
              </a>

              {/* {item.website && (
                <a
                  href={item.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-sm transition-all"
                >
                  🌐 Kunjungi Situs
                </a>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
