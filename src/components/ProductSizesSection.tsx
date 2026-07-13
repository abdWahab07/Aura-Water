"use client";

import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { fadeIn } from "@/lib/motion";
import { AURA_X_BOTTLES, type ProductBottle } from "@/lib/productBottles";
import { DriftingBottle, GROUP_DRIFTS, SINGLE_DRIFT } from "./DriftingBottle";
import { AnimatedHeading, Reveal } from "./Reveal";

type ProductSizesSectionProps = {
  title?: string;
  description?: string;
  bottles?: ProductBottle[];
};

const DEFAULT_BOTTLES = [AURA_X_BOTTLES.small, AURA_X_BOTTLES.large];

export function ProductSizesSection({
  title = "The Hills In Your Hand",
  description = "On-the-go, at home, or at work. There's a size for every occasion.",
  bottles = DEFAULT_BOTTLES,
}: ProductSizesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Drive the bottle drift from when the section enters the viewport until its
  // center reaches the middle of the screen — mirroring the home page.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const isGroup = bottles.length > 1;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f2edf7]"
    >
      <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-16 sm:px-8 md:pb-24 md:pt-20">
        <AnimatedHeading
          text={title}
          className="text-center font-display text-4xl font-bold uppercase tracking-tight text-[#1b4ef5] sm:text-5xl md:text-6xl"
        />

        <Reveal
          variants={fadeIn}
          delay={0.12}
          className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-relaxed text-slate-700 sm:text-base"
        >
          <p>{description}</p>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-end justify-center gap-6 sm:gap-8 md:mt-16 md:gap-10">
          {bottles.map((bottle, i) => (
            <div key={bottle.src} className="relative flex flex-col items-center">
              <DriftingBottle
                progress={scrollYProgress}
                float={false}
                config={
                  isGroup ? GROUP_DRIFTS[i % GROUP_DRIFTS.length] : SINGLE_DRIFT
                }
                className="relative"
                style={{
                  height: bottle.heightClass ?? "clamp(160px, 22vw, 280px)",
                  aspectRatio: `${bottle.width} / ${bottle.height}`,
                }}
              >
                <Image
                  src={bottle.src}
                  alt={bottle.alt}
                  fill
                  sizes="(max-width: 768px) 28vw, 14vw"
                  className="object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.16)]"
                />
              </DriftingBottle>
              <span className="absolute -bottom-1 left-1/2 h-[7px] w-[75%] -translate-x-1/2 rounded-[50%] bg-black/20 blur-[5px]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
