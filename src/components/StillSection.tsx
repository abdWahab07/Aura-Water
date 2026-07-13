"use client";

import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { fadeInUp, fadeIn } from "@/lib/motion";
import { DriftingBottle, SINGLE_DRIFT, GROUP_DRIFTS } from "./DriftingBottle";
import { AnimatedHeading } from "./Reveal";

type Bottle = {
  src: string;
  alt: string;
  /** intrinsic pixel dimensions (for aspect ratio) */
  width: number;
  height: number;
  /** relative rendered size within the row (1 = full row height) */
  scale?: number;
};

type StillSectionProps = {
  /** Mirror the layout: bottle on the left, copy on the right. */
  reverse?: boolean;
  /** Heading text shown in the copy column. */
  heading?: string;
  /** Body copy shown beneath the heading. */
  description?: string;
  /** One or more bottles displayed side by side in the image column. */
  bottles?: Bottle[];
};

const DEFAULT_DESCRIPTION =
  "You couldn't wish for a more down-to-earth pick-me-up. As refreshing, healthy, natural and hydrating as you'd expect. Pull a chilled bottle from the fridge or pop one into your bag for on-the-go hydration.";

const DEFAULT_BOTTLES: Bottle[] = [
  {
    src: "/assets/smallWater.png",
    alt: "AURA X bottled drinking water — still",
    width: 1023,
    height: 1537,
  },
];

export function StillSection({
  reverse = false,
  heading = "AURA X",
  description = DEFAULT_DESCRIPTION,
  bottles = DEFAULT_BOTTLES,
}: StillSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // A single bottle can be larger; a group of bottles is scaled down so the
  // row fits comfortably in the image column.
  const bottleHeight =
    bottles.length > 1
      ? "clamp(200px, 30vw, 360px)"
      : "clamp(280px, 42vw, 460px)";

  // Progress runs from when the section first enters the viewport (while the
  // previous section is still in view) until the section's center reaches the
  // middle of the screen.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // A single bottle keeps its original entrance; a group gets a distinct
  // per-bottle drift so each flies in from a different side.
  const isGroup = bottles.length > 1;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-x-clip bg-white py-16 md:py-24"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="relative">
          {/* Angled cream panel */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative bg-[#B4E1EB] shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]"
            style={{
              clipPath: reverse
                ? "polygon(0 0, 100% 6%, 100% 100%, 0 94%)"
                : "polygon(0 6%, 100% 0, 100% 94%, 0 100%)",
            }}
          >
            <div className="grid items-center gap-8 px-8 py-16 sm:px-14 md:grid-cols-2 md:py-24 lg:px-20">
              {/* Copy */}
              <div className={`max-w-md ${reverse ? "md:order-2" : ""}`}>
                <AnimatedHeading
                  text={heading}
                  className="font-display text-5xl font-bold uppercase tracking-tight text-[#1b4ef5] sm:text-6xl"
                />

                <motion.p
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  className="mt-6 text-[15px] leading-relaxed text-slate-600 sm:text-base"
                >
                  {description}
                </motion.p>

                <motion.a
                  href={heading.toLowerCase().includes("custom") ? "/custom-aura-x" : "/aura-x"}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-10 inline-flex items-center justify-center rounded-full border-2 border-[#1b4ef5] px-8 py-3 font-display text-sm font-semibold uppercase tracking-wide text-[#1b4ef5] transition-colors hover:bg-[#1b4ef5] hover:text-white"
                >
                  Find Out More
                </motion.a>
              </div>

              {/* Spacer reserving the bottle's place in the layout */}
              <div
                aria-hidden
                className={reverse ? "md:order-1" : ""}
                style={{ height: bottleHeight }}
              />
            </div>
          </motion.div>

          {/* Bottle floats above the panel so it can rise into the previous
              section and glide down as you scroll. */}
          <div
            className={`pointer-events-none absolute bottom-10 left-1/2 z-20 -translate-x-1/2 md:translate-x-0 ${
              reverse
                ? "md:left-[10%] md:right-auto lg:left-[14%]"
                : "md:left-auto md:right-[10%] lg:right-[14%]"
            }`}
          >
            <div
              style={{ height: bottleHeight }}
              className="flex items-end [&>*:not(:first-child)]:-ml-8 sm:[&>*:not(:first-child)]:-ml-12"
            >
              {bottles.map((bottle, i) => (
                <DriftingBottle
                  key={bottle.src}
                  progress={scrollYProgress}
                  reverse={reverse}
                  config={
                    isGroup
                      ? GROUP_DRIFTS[i % GROUP_DRIFTS.length]
                      : SINGLE_DRIFT
                  }
                  className="relative"
                  style={{
                    height: `${(bottle.scale ?? 1) * 94}%`,
                    aspectRatio: `${bottle.width} / ${bottle.height}`,
                  }}
                >
                  <Image
                    src={bottle.src}
                    alt={bottle.alt}
                    fill
                    sizes="(max-width: 768px) 40vw, 20vw"
                    className="object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.18)]"
                    priority
                  />
                </DriftingBottle>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
