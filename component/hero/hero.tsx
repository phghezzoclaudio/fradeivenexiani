"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  "/images/hero/venice-1.jpg",
  "/images/hero/venice-2.jpg",
  
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [paused]);

  return (
    <section
      className="relative h-screen w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      {slides.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt="Venezia"
            fill
            priority={index === 0}
            className={`object-cover scale-105 transition-transform duration-[7000ms] ${
              index === current ? "scale-110" : "scale-105"
            }`}
          />
        </div>
      ))}

      {/* Overlay cinematic */}
      <div className="absolute inset-0 bg-black/40 z-20" />

      {/* Content */}
      <div className="relative z-30 flex h-full items-center justify-center">
        <div className="text-center px-6 max-w-4xl">
          <p className="text-venice-gold uppercase tracking-[0.25em] text-xs mb-4">
            Venice Smart
          </p>

          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight mb-6">
            Venezia raccontata
            <br />
            da chi la vive
          </h1>

          <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            La guida autentica dei fradeivenexiani per scoprire la città vera.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/itinerari"
              className="px-8 py-3 rounded-full bg-venice-red text-white font-semibold hover:bg-venice-gold transition"
            >
              Inizia il viaggio
            </Link>

            <Link
              href="/chi-siamo"
              className="px-8 py-3 rounded-full border border-white/70 text-white font-semibold hover:bg-white/10 transition"
            >
              Chi siamo
            </Link>
          </div>
        </div>
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === current
                ? "w-8 bg-white"
                : "w-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 text-white/70 text-sm animate-bounce">
        ↓ Scorri
      </div>
    </section>
  );
}