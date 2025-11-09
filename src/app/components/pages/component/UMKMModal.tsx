"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Modal from "@mui/joy/Modal";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import ModalClose from "@mui/joy/ModalClose";
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

  const gallery = item.gallery && item.gallery.length > 0 ? item.gallery : ["/assets/placeholder-card.jpg"];
  const prev = () => setIndex((i) => (i - 1 + gallery.length) % gallery.length);
  const next = () => setIndex((i) => (i + 1) % gallery.length);

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="umkm-modal-title"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div
        className="w-[95%] md:w-4/5 lg:w-3/4 max-h-[90vh] overflow-auto rounded-lg bg-white shadow-xl relative"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Close */}
        <div className="absolute top-3 right-3 z-10">
          <ModalClose sx={{ bgcolor: "transparent" }} />
        </div>

        {/* Breadcrumbs */}
        <div className="px-6 pt-6">
          <Breadcrumbs separator="›" aria-label="breadcrumb" className="!text-sm">
            <span underline="hover" color="neutral" href="#" className="text-gray-600">
              {item.category ?? "UMKM"}
            </span>
            <span className="text-sm text-gray-800">{item.name}</span>
          </Breadcrumbs>
        </div>

        {/* Content */}
        <div className="px-9 pb-6">
          <h2 id="umkm-modal-title" className="text-2xl font-semibold text-gray-900 mt-3">
            {item.name}
          </h2>

          <div className="mt-4 flex flex-col md:flex-row gap-6">
            {/* gallery */}
            <div className="flex-1">
              <div className="relative w-full h-64 md:h-80 rounded overflow-hidden bg-gray-100">
                <Image
                  src={gallery[index]}
                  alt={`${item.name} image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 600px, 800px"
                />

                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      aria-label="Previous image"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 p-2 rounded-full shadow"
                    >
                      ‹
                    </button>

                    <button
                      onClick={next}
                      aria-label="Next image"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 p-2 rounded-full shadow"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`relative h-14 w-24 rounded overflow-hidden border ${
                      i === index ? "border-[#204564]" : "border-gray-200"
                    }`}
                    aria-label={`Thumbnail ${i + 1}`}
                  >
                    <Image src={g} alt={`thumb-${i}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <section>
                <h3 className="text-sm font-medium text-gray-500">Deskripsi</h3>
                <p className="text-sm text-gray-800 mt-1 text-justify">{item.description ?? "Tidak ada deskripsi."}</p>
              </section>

              <section>
                <h3 className="text-sm font-medium text-gray-500">Alamat</h3>
                <p className="text-sm text-gray-800 mt-1">{item.address ?? "-"}</p>
              </section>

              <div className="flex gap-4 flex-wrap">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Jam Buka</h4>
                  <p className="text-sm text-gray-800 mt-1">{item.hours ?? "-"}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500">Kontak</h4>
                  <p className="text-sm text-gray-800 mt-1">{item.contact ?? "-"}</p>
                </div>
              </div>

              <section>
                <h4 className="text-sm font-medium text-gray-500">Harga</h4>
                <p className="text-sm text-gray-800 mt-1">{item.priceRange ?? "Harga bervariasi"}</p>
              </section>

              {item.socials && (
                <section>
                  <h4 className="text-sm font-medium text-gray-500">Sosial</h4>
                  <p className="text-sm text-gray-800 mt-1">{item.socials}</p>
                </section>
              )}

              {/* Map preview */}
              <section>
                <h4 className="text-sm font-medium text-gray-500">Lokasi</h4>
                <div className="mt-2">
                  <MapPreview lat={item.lat ?? null} lng={item.lng ?? null} name={item.name} mapKey={item.id} />
                </div>
              </section>

              {/* Actions */}
              <div className="mt-3 flex gap-2">
                <a
                  href={item.mapsUrl ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded text-sm bg-[#204564] text-white hover:bg-[#3e607d] transition"
                >
                  Buka di peta
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
