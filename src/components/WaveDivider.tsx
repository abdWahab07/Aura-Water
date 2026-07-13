"use client";

import { motion } from "framer-motion";
import { scaleIn, viewportOnce } from "@/lib/motion";

/**
 * Horizontal wavy line used as a decorative border between page sections.
 * Mirrors the wavy underline shown on hover in the navbar.
 */
export function WaveDivider({
  className = "",
  color = "#1b4ef5",
}: {
  className?: string;
  color?: string;
}) {
  const stroke = encodeURIComponent(color);
  const wave = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='12' viewBox='0 0 40 12'%3E%3Cpath d='M0 6 Q 10 0 20 6 T 40 6' fill='none' stroke='${stroke}' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`;

  return (
    <motion.div
      role="separator"
      aria-hidden="true"
      variants={scaleIn}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`h-3 w-full origin-center ${className}`}
      style={{
        backgroundImage: wave,
        backgroundRepeat: "repeat-x",
        backgroundPosition: "center",
        backgroundSize: "40px 12px",
      }}
    />
  );
}
