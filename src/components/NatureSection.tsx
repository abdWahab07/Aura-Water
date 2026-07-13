"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  fadeIn,
  fadeInUp,
  fadeInRight,
  scaleIn,
  staggerFast,
} from "@/lib/motion";
import { AURA_X_BOTTLES, type ProductBottle } from "@/lib/productBottles";
import { AnimatedHeading, Reveal, Stagger, StaggerItem } from "./Reveal";

const TABS = ["Nutrition", "A Size For Any Occasion", "Recycling"] as const;
type Tab = (typeof TABS)[number];

const MINERALS: { label: string; value: string; unit?: string }[] = [
  { label: "Calcium", value: "46–91", unit: "mg/L" },
  { label: "Sodium", value: "20–45", unit: "mg/L" },
  { label: "Magnesium", value: "10–45", unit: "mg/L" },
  { label: "Potassium", value: "1–10", unit: "mg/L" },
  { label: "Chloride", value: "50–110", unit: "mg/L" },
  { label: "Sulphate", value: "20–80", unit: "mg/L" },
  { label: "Fluoride", value: "0.1–0.7", unit: "mg/L" },
  { label: "TDS (Total Dissolved Solids)", value: "140–180", unit: "mg/L" },
  { label: "pH", value: "6.5–8.5" },
];

function NutritionPanel() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        className="rounded-2xl bg-white/70 p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.3)] sm:p-8"
      >
        <div className="flex items-center justify-between border-b border-slate-300/70 pb-3">
          <h3 className="font-semibold text-slate-800">Mineral / Parameter</h3>
          <span className="text-sm font-medium text-slate-500">Content</span>
        </div>
        <motion.ul
          variants={staggerFast}
          initial="hidden"
          animate="visible"
          className="mt-4 space-y-2.5"
        >
          {MINERALS.map((row) => (
            <motion.li
              key={row.label}
              variants={fadeInUp}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span className="text-slate-600">{row.label}</span>
              <span className="shrink-0 text-right font-medium text-slate-800">
                {row.value}
                {row.unit && (
                  <span className="ml-1 text-xs font-normal text-slate-500">
                    {row.unit}
                  </span>
                )}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        variants={scaleIn}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.1 }}
        className="rounded-2xl bg-white/70 p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.3)] sm:p-8"
      >
        <h3 className="border-b border-slate-300/70 pb-3 font-semibold text-slate-800">
          Bottle sizes
        </h3>
        <p className="mt-4 text-sm text-slate-600">Available in:</p>
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-1 font-display text-2xl font-bold tracking-tight text-[#1b4ef5] sm:text-3xl"
        >
          500ML <span className="text-slate-400">/</span> 1.5L
        </motion.p>
      </motion.div>
    </div>
  );
}

function OccasionPanel({ productName }: { productName: string }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className="rounded-2xl bg-white/70 p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.3)] sm:p-8"
    >
      <h3 className="border-b border-slate-300/70 pb-3 font-semibold text-slate-800">
        A size for any occasion
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        Whether it&apos;s a quick sip on the move, a bottle for your desk, or a
        larger size to share at home, {productName} comes in a range of sizes to
        fit every moment of your day.
      </p>
    </motion.div>
  );
}

function RecyclingPanel({ productName }: { productName: string }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className="rounded-2xl bg-white/70 p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.3)] sm:p-8"
    >
      <h3 className="border-b border-slate-300/70 pb-3 font-semibold text-slate-800">
        Recycling
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-slate-600">
        Every {productName} bottle is 100% recyclable. Empty it, replace the cap,
        and pop it in your recycling so it can live another life.
      </p>
    </motion.div>
  );
}

type NatureSectionProps = {
  bottle?: ProductBottle;
  productName?: string;
  tabUnderlineId?: string;
};

export function NatureSection({
  bottle = AURA_X_BOTTLES.small,
  productName = "AURA X",
  tabUnderlineId = "nature-tab-underline",
}: NatureSectionProps) {
  const [tab, setTab] = useState<Tab>("Nutrition");

  return (
    <section className="relative overflow-hidden bg-[#f2edf7]">
      <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-16 sm:px-8 md:pb-24 md:pt-20">
        <AnimatedHeading
          text="Nothing Beats Nature"
          className="text-center font-display text-4xl font-bold uppercase tracking-tight text-[#1b4ef5] sm:text-5xl md:text-6xl"
        />

        <Reveal
          variants={fadeIn}
          delay={0.12}
          className="mx-auto mt-5 max-w-xl text-center text-[15px] leading-relaxed text-slate-700 sm:text-base"
        >
          <p>
            From the sky through the earth to your lips. (With a small detour for
            us to bottle it and get it to you.) It&apos;s how hydration should be.
          </p>
        </Reveal>

        <div className="mt-12 grid items-center gap-8 md:mt-16 md:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -4 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -10 }}
            className="relative mx-auto"
            style={{
              height: "clamp(260px, 40vw, 440px)",
              aspectRatio: `${bottle.width} / ${bottle.height}`,
            }}
          >
            <Image
              src={bottle.src}
              alt={bottle.alt}
              fill
              sizes="(max-width: 768px) 60vw, 25vw"
              className="object-contain drop-shadow-[0_20px_26px_rgba(0,0,0,0.18)]"
            />
          </motion.div>

          <Reveal variants={fadeInRight}>
            <Stagger fast className="flex flex-wrap gap-x-8 gap-y-3 border-b border-slate-300/70 pb-1">
              {TABS.map((t) => (
                <StaggerItem key={t}>
                  <button
                    type="button"
                    onClick={() => setTab(t)}
                    className="relative pb-3 font-display text-sm font-bold uppercase tracking-[0.05em] transition-colors"
                  >
                    <span
                      className={
                        tab === t
                          ? "text-[#1b4ef5]"
                          : "text-slate-500 hover:text-slate-700"
                      }
                    >
                      {t}
                    </span>
                    {tab === t && (
                      <motion.span
                        layoutId={tabUnderlineId}
                        className="absolute -bottom-px left-0 h-[3px] w-full rounded-full bg-[#1b4ef5]"
                      />
                    )}
                  </button>
                </StaggerItem>
              ))}
            </Stagger>

            <div className="mt-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {tab === "Nutrition" && <NutritionPanel />}
                  {tab === "A Size For Any Occasion" && (
                    <OccasionPanel productName={productName} />
                  )}
                  {tab === "Recycling" && (
                    <RecyclingPanel productName={productName} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
