"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all ${
        scrolled
          ? "bg-white/95 backdrop-blur shadow-sm"
          : "bg-white"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold text-venice-red tracking-tight"
        >
          fradeivenexiani
        </Link>

        {/* Menu desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#" className="hover:text-venice-lagoon transition">
            Scopri Venezia
          </Link>
          <Link href="#" className="hover:text-venice-lagoon transition">
            Itinerari
          </Link>
          <Link href="#" className="hover:text-venice-lagoon transition">
            Esperienze
          </Link>
          <Link href="#" className="hover:text-venice-lagoon transition">
            Chi siamo
          </Link>
        </div>

        {/* CTA */}
        <Link
          href="#"
          className="hidden md:inline-flex items-center px-5 py-2 rounded-full
          bg-venice-red text-white text-sm font-semibold
          hover:bg-venice-gold transition"
        >
          Inizia il viaggio
        </Link>

        {/* Mobile menu icon */}
        <button className="md:hidden">
          <span className="sr-only">Menu</span>
          ☰
        </button>
      </nav>
    </header>
  );
}