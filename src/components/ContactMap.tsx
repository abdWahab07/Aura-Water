"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { fadeInUp, fadeIn } from "@/lib/motion";

const MAP_SRC =
  "https://www.google.com/maps?q=31.61726951599121,74.37696838378906&z=17&hl=en&output=embed";

export function ContactMap() {
  return (
    <section className="relative overflow-hidden bg-[#f2f7fb] py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <motion.span
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="block text-center font-display text-sm font-semibold uppercase tracking-[0.22em] text-[#1b4ef5]"
        >
          Find Us
        </motion.span>

        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-3 text-center font-display text-4xl font-bold uppercase tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
        >
          Where The Water Springs
        </motion.h2>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-5 max-w-xl text-center text-[15px] leading-relaxed text-slate-600 sm:text-base"
        >
          Come visit us or send your delivery our way — we&apos;re always happy
          to welcome you.
        </motion.p>

        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mt-12 overflow-hidden rounded-3xl border-2 border-[#1b4ef5] shadow-[0_30px_80px_-45px_rgba(0,0,0,0.5)]"
        >
          <iframe
            title="Aura Water location map"
            src={MAP_SRC}
            width="100%"
            height="480"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[360px] w-full grayscale-[0.15] md:h-[480px]"
          />

          {/* Floating address card */}
          <div className="pointer-events-none absolute bottom-5 left-5 right-5 sm:left-8 sm:right-auto sm:max-w-xs">
            <div className="pointer-events-auto flex items-start gap-3 rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1b4ef5] text-white">
                <MapPin className="h-5 w-5" strokeWidth={2} />
              </span>
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-[0.06em] text-slate-900">
                  Aura Water
                </p>
                <p className="mt-1 text-sm text-slate-600">Muhammad Abdul Moiz</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
