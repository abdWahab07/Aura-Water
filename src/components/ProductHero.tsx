"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, bottleStagger, bottleRise } from "@/lib/motion";
import { AURA_X_BOTTLES, type ProductBottle } from "@/lib/productBottles";

const DEFAULT_HEADING = ["Sip.", "Refresh.", "Repeat."];

type ProductHeroProps = {
  headingWords?: string[];
  bottle?: ProductBottle;
};

export function ProductHero({
  headingWords = DEFAULT_HEADING,
  bottle = AURA_X_BOTTLES.small,
}: ProductHeroProps) {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <Image
        src="/assets/bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0f3ad0]/45 via-transparent to-[#0f3ad0]/20" />

      <div className="mx-auto grid min-h-[100svh] max-w-[1400px] grid-cols-1 items-center gap-10 px-5 pb-16 pt-[clamp(140px,20vh,210px)] sm:px-8 md:grid-cols-2 md:gap-6 md:pb-10">
        <div className="max-w-xl">
          <motion.h1
            variants={bottleStagger}
            initial="hidden"
            animate="visible"
            className="font-display font-bold uppercase leading-[0.92] tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.25)]"
          >
            {headingWords.map((word) => (
              <motion.span
                key={word}
                variants={fadeInUp}
                className="block text-[clamp(56px,11vw,120px)]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
        </div>

        <motion.div
          variants={bottleStagger}
          initial="hidden"
          animate="visible"
          className="relative flex items-end justify-center"
          style={{ height: "clamp(300px, 46vw, 520px)" }}
        >
          <motion.div
            variants={bottleRise}
            className="relative h-full"
            style={{ aspectRatio: `${bottle.width} / ${bottle.height}` }}
          >
            <Image
              src={bottle.src}
              alt={bottle.alt}
              fill
              sizes="(max-width: 768px) 55vw, 28vw"
              className="object-contain drop-shadow-[0_22px_28px_rgba(0,0,0,0.28)]"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
