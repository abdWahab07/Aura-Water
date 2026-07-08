"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Waves, ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { fadeDown } from "@/lib/motion";
import { CurvedTop } from "./CurvedTop";
import { SOCIALS } from "@/components/SocialIcons";

const PRODUCT_LINKS = [
  { label: "AURA X", href: "/aura-x" },
  { label: "Custom Aura", href: "/custom-aura-x" },
];

type MenuSection = {
  label: string;
  href: string;
  links: { label: string; href: string }[];
};

const MENU_SECTIONS: MenuSection[] = [
  {
    label: "Products",
    href: "#products",
    links: [
      { label: "AURA X", href: "/aura-x" },
      { label: "Custom Aura", href: "/custom-aura-x" },
    ],
  },
];

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
      className="pointer-events-auto fixed inset-y-0 right-0 z-[60] flex w-full max-w-md flex-col bg-[#1b4ef5] text-white shadow-2xl"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 pt-4 sm:px-8">
        <Link href="/" aria-label="Aura Water home" onClick={onClose} className="-mt-2 flex items-center">
          <Image
            src="/assets/logo.png"
            alt="Aura Water"
            width={1024}
            height={1536}
            className="h-20 w-auto"
          />
        </Link>

        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-[0.1em] text-white"
        >
          Close
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/50">
            <X className="h-4 w-4" strokeWidth={2.4} />
          </span>
        </button>
      </div>

      {/* Accordion list */}
      <nav className="mt-6 flex-1 overflow-y-auto px-5 sm:px-8">
        <Link
          href="/"
          onClick={onClose}
          className="block border-b border-white/15 py-5 font-display text-2xl font-bold uppercase tracking-tight text-white transition-colors hover:text-white/90"
        >
          Home
        </Link>

        {MENU_SECTIONS.map((section, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={section.label} className="border-b border-white/15">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between py-5 text-left"
              >
                <span className="font-display text-2xl font-bold uppercase tracking-tight">
                  {section.label}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/50"
                >
                  <ChevronDown className="h-4 w-4" strokeWidth={2.4} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={onClose}
                          className="block py-2.5 pl-1 text-base text-white/80 transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    <li className="h-3" />
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}

        <Link
          href="/contact"
          onClick={onClose}
          className="block border-b border-white/15 py-5 font-display text-2xl font-bold uppercase tracking-tight text-white transition-colors hover:text-white/90"
        >
          Contact Us
        </Link>
      </nav>

      {/* Socials */}
      <div className="flex items-center gap-3 px-5 pb-8 pt-6 sm:px-8">
        {SOCIALS.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-[#1b4ef5]"
          >
            <Icon className="h-[18px] w-[18px]" />
          </a>
        ))}
      </div>
    </motion.div>
  );
}

export function Navbar({
  variant = "transparent",
}: {
  variant?: "transparent" | "white";
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const isWhite = variant === "white";

  // Prevent the page behind the menu from scrolling while it's open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Pin the navbar once the user scrolls past the hero.
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the desktop Products dropdown when clicking outside of it.
  useEffect(() => {
    if (!productsOpen) return;
    function handleClick(e: MouseEvent) {
      if (
        productsRef.current &&
        !productsRef.current.contains(e.target as Node)
      ) {
        setProductsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [productsOpen]);

  useEffect(() => {
    if (isScrolled) setProductsOpen(false);
  }, [isScrolled]);

  const linkClass = `nav-link text-[13px] font-bold uppercase tracking-[0.08em] transition-opacity hover:opacity-90 ${
    isWhite ? "nav-link-dark text-[#1b4ef5]" : "text-white"
  }`;

  return (
    <motion.header
      variants={fadeDown}
      initial="hidden"
      animate="visible"
      className={`pointer-events-none z-50 w-full transition-[box-shadow,background-color] duration-300 ${
        isScrolled ? "fixed inset-x-0 top-0" : "absolute inset-x-0 top-0"
      }`}
    >
      {/* Curved ribbon background */}
      <CurvedTop
        className={`absolute inset-x-0 top-0 h-[120px] w-full md:h-[150px] ${
          isWhite ? "drop-shadow-[0_6px_16px_rgba(0,0,0,0.08)]" : ""
        }`}
        fill={isWhite ? "#ffffff" : "#1b4ef5"}
      />

      <div className="pointer-events-auto relative mx-auto flex max-w-[1400px] items-start justify-between px-5 pt-4 sm:px-8 md:pt-5">
        {/* Logo — top left */}
        <Link
          href="/"
          aria-label="Aura Water home"
          className="-mt-3 flex items-center md:-mt-6"
        >
          <Image
            src="/assets/logo.png"
            alt="Aura Water"
            width={1024}
            height={1536}
            priority
            className="h-36 w-auto md:h-[145px]"
          />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden items-center gap-7 pt-2 lg:flex xl:gap-9">
          <Link href="/" className={linkClass}>
            Home
          </Link>

          {/* Products dropdown */}
          <div ref={productsRef} className="relative">
            <button
              type="button"
              onClick={() => setProductsOpen((v) => !v)}
              aria-expanded={productsOpen}
              aria-haspopup="menu"
              className={`${linkClass} flex items-center gap-1`}
            >
              Products
              <motion.span
                animate={{ rotate: productsOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="inline-flex"
              >
                <ChevronDown className="h-3.5 w-3.5" strokeWidth={2.6} />
              </motion.span>
            </button>

            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  role="menu"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-0 top-full mt-4 min-w-[210px] overflow-hidden rounded-2xl bg-white p-2 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] ring-1 ring-black/5"
                >
                  {PRODUCT_LINKS.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      role="menuitem"
                      onClick={() => setProductsOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-[13px] font-bold uppercase tracking-[0.06em] text-[#1b4ef5] transition-colors hover:bg-[#1b4ef5]/10"
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/contact" className={linkClass}>
            Contact Us
          </Link>
        </nav>

        {/* Mobile: menu button only */}
        <motion.button
          type="button"
          onClick={() => setMenuOpen(true)}
          whileTap={{ scale: 0.95 }}
          aria-label="Open menu"
          className={`mt-1 flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-colors duration-300 lg:hidden ${
            isWhite ? "bg-[#1b4ef5] text-white" : "bg-white text-[#1b4ef5]"
          }`}
        >
          <Waves className="h-5 w-5" strokeWidth={2.4} />
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </motion.header>
  );
}
