"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const lastScroll = useRef(0);

  const navLinks = [
    { href: "/", label: "" },
    { href: "/itinerari", label: "Itinerari" },
    { href: "/arrivare-a-venezia", label: "Arrivare" },
    { href: "/maree", label: "Acqua Alta" },
    { href: "/chi-siamo", label: "Chi siamo" },
  ];

  /* ===== SCROLL LOGIC ===== */
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;

      // background switch
      setScrolled(current > 10);

      // hide on scroll down
      if (current > lastScroll.current && current > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScroll.current = current;
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    pathname === href ||
    (href !== "/" && pathname.startsWith(href));

  return (
    <>
      {/* ===== HEADER ===== */}

<header
  className={`
    fixed top-0 left-0 right-0 w-full z-50
    transition-all duration-300
    ${hidden ? "-translate-y-full" : "translate-y-0"}
    ${
      scrolled
        ? "bg-transparent"
        : "bg-white/95 backdrop-blur border-b border-venice-border shadow-sm"
    }
  `}
>

        <div
          className={`
            max-w-7xl mx-auto px-6 flex items-center justify-between
            transition-all duration-300
            ${scrolled ? "h-20" : "h-16"}
          `}
        >
          {/* Logo */}
          <Link
            href="/"
            className={`
              font-bold tracking-tight transition-all duration-300
              ${
                scrolled
                  ? "text-white text-2xl"
                  : "text-venice-red text-xl"
              }
            `}
          >
            fradeivenexiani
          </Link>

          {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8 lg:gap-10 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-1 py-2 group"
              >
                <span
                  className={`
                    transition-colors duration-200
                    ${
                      scrolled
                        ? isActive(link.href)
                          ? "text-venice-gold"
                          : "text-white/90 group-hover:text-white"
                        : isActive(link.href)
                        ? "text-venice-red"
                        : "text-venice-graphite group-hover:text-venice-red"
                    }
                  `}
                >
                  {link.label}
                </span>

                {/* underline luxury */}
                <span
                  className={`
                    absolute left-0 -bottom-1 h-[2px] w-full
                    origin-left scale-x-0 group-hover:scale-x-100
                    transition-transform duration-300
                    ${
                      scrolled
                        ? "bg-venice-gold"
                        : "bg-venice-red"
                    }
                  `}
                />
              </Link>
            ))}
          </nav>

          {/* Mobile button */}
          <button
            onClick={() => setOpen(true)}
            className={`
              md:hidden transition-colors
              ${scrolled ? "text-white" : "text-venice-graphite"}
            `}
            aria-label="Menu"
          >
            <div className="space-y-1">
              <span className="block w-6 h-0.5 bg-current" />
              <span className="block w-6 h-0.5 bg-current" />
              <span className="block w-6 h-0.5 bg-current" />
            </div>
          </button>
        </div>
      </header>

      {/* ===== MOBILE OVERLAY ===== */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/40 backdrop-blur-sm
          transition-opacity duration-300 md:hidden
          ${open ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={() => setOpen(false)}
      />

      {/* ===== MOBILE DRAWER ===== */}
      <aside
        className={`
          fixed top-0 right-0 z-50 h-full w-full
          bg-white shadow-2xl
          transition-transform duration-300 md:hidden
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="p-6 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`
                font-medium text-lg
                ${
                  isActive(link.href)
                    ? "text-venice-red"
                    : "text-venice-graphite"
                }
              `}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}