"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { bottleRise, bottleStagger } from "@/lib/motion";

type BottleItem = {
  src: string;
  alt: string;
  /** intrinsic pixel dimensions (for aspect ratio) */
  w: number;
  h: number;
  /** rendered height — a larger fixed size on mobile, then from the `sm`
   * breakpoint up it scales with the viewport and is capped on large screens */
  heightClass: string;
};

const BOTTLES: BottleItem[] = [
  {
    src: "/assets/smallWater.png",
    alt: "AURA X bottled drinking water — small",
    w: 1023,
    h: 1537,
    heightClass: "h-[230px] sm:h-[clamp(150px,22vw,300px)]",
  },
  {
    src: "/assets/largeBottle.png",
    alt: "AURA X bottled drinking water — large",
    w: 1086,
    h: 1448,
    heightClass: "h-[300px] sm:h-[clamp(200px,30vw,400px)]",
  },
];

export function BottleSection() {
  return (
    <motion.div
      variants={bottleStagger}
      initial="hidden"
      animate="visible"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-center px-4 pb-10 [&>*:not(:first-child)]:-ml-14 sm:[&>*:not(:first-child)]:-ml-20"
    >
      {BOTTLES.map((b) => (
        <motion.div
          key={b.src}
          variants={bottleRise}
          className="relative flex flex-col items-center"
        >
          <div
            className={`relative ${b.heightClass}`}
            style={{ aspectRatio: `${b.w} / ${b.h}` }}
          >
            <Image
              src={b.src}
              alt={b.alt}
              fill
              sizes="(max-width: 768px) 40vw, 30vw"
              className="object-contain drop-shadow-[0_16px_18px_rgba(0,0,0,0.22)]"
            />
          </div>
          {/* Contact shadow beneath the bottle */}
          <span className="absolute -bottom-1 left-1/2 h-[8px] w-[70%] -translate-x-1/2 rounded-[50%] bg-black/25 blur-[6px]" />
        </motion.div>
      ))}
    </motion.div>
  );
}
