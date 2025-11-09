"use client";

import React, { useEffect, useRef, useState } from "react";

type Banner = {
  id: string | number;
  title?: string;
  subtitle?: string;
  imageUrl: string;
  cta?: string;
};

const banners: Banner[] = [
  {
    id: 1,
    title: "Ini Promosi 1",
    subtitle: "Sekalian buat test",
    imageUrl: "/assets/banners/banner1.png",
  },
  {
    id: 2,
    title: "Kalau yang ini Promosi 2",
    subtitle: "Sama juga buat test",
    imageUrl: "/assets/banners/banner2.png",
  },
  {
    id: 3,
    title: "Dan yang ini Promosi 3",
    subtitle: "Sekaligus Placeholder",
    imageUrl: "/assets/banners/banner3.png",
  },
];

export default function HomeBanner({
  intervalMs = 5000,
  height = "h-40",
}: {
  intervalMs?: number;
  height?: string;
}) {
  const [index, setIndex] = useState(0);
  const length = banners.length;
  const timerRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function startTimer() {
    stopTimer();
    timerRef.current = window.setInterval(() => {
      if (!isHoveredRef.current) {
        setIndex((prev) => (prev + 1) % length);
      }
    }, intervalMs);
  }

  function stopTimer() {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }

  function goPrev() {
    setIndex((i) => (i - 1 + length) % length);
  }

  function goNext() {
    setIndex((i) => (i + 1) % length);
  }

  function handleMouseEnter() {
    isHoveredRef.current = true;
    stopTimer();
  }

  function handleMouseLeave() {
    isHoveredRef.current = false;
    startTimer();
  }

  return (
    <div
      className="w-full max-w-5xl mx-auto mt-8 relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
    >
      <div className={`overflow-hidden rounded-lg ${height} bg-white shadow-sm`}>
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{
            width: `${length * 100}%`,
            transform: `translateX(-${(index * 100) / length}%)`,
          }}
        >
          {banners.map((b) => (
            <div
              key={b.id}
              className="flex-shrink-0 w-full flex items-center justify-center relative"
              style={{ width: `${100 / length}%` }}
            >
                
              <img
                src={b.imageUrl}
                alt={b.title ?? "banner"}
                draggable={false}
                className="w-full h-full rounded-lg object-cover object-right"
              />

              {/* Text overlay, comment if not needed */}
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 text-left text-white drop-shadow-lg pointer-events-none">
                {b.title && <h3 className="text-xl md:text-2xl font-bold">{b.title}</h3>}
                {b.subtitle && <p className="text-sm md:text-base mt-1">{b.subtitle}</p>}
              </div>

            </div>
          ))}
        </div>
      </div>

    {/* Button L */}
      <button
        onClick={goPrev}
        aria-label="Previous banner"
        className="absolute left-[-50px] top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow-md"
        style={{ backdropFilter: "blur(4px)" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

    {/* Button R */}
      <button
        onClick={goNext}
        aria-label="Next banner"
        className="absolute right-[-50px] top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 rounded-full p-2 shadow-md"
        style={{ backdropFilter: "blur(4px)" }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

    {/* Indicator Bar */}
      <div className="flex justify-center gap-2 mt-3">
        {banners.map((b, i) => (
          <button
            key={b.id}
            onClick={() => setIndex(i)}
            aria-label={`Go to banner ${i + 1}`}
            className={`w-8 h-1 rounded-full transition-all ${i === index ? "bg-[#204564] w-12" : "bg-gray-300"}`}
          />
        ))}
      </div>

    </div>
  );
}
