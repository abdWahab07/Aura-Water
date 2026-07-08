"use client";

import { motion } from "framer-motion";
import { fadeInUp, fadeIn } from "@/lib/motion";

export function OccasionsSection() {
  return (
    <section className="relative -mt-px overflow-hidden bg-white">
      <div className="mx-auto max-w-[1400px] px-5 pb-16 pt-32 sm:px-8 md:pb-24 md:pt-44">
        {/* Heading + description */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center font-display text-4xl font-bold uppercase tracking-tight text-[#1b4ef5] sm:text-5xl md:text-6xl"
        >
          Something For All Occasions
        </motion.h2>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-5 max-w-xl text-center text-[15px] leading-relaxed text-slate-500 sm:text-base"
        >
          We&apos;re here to bring it from those hills to you. It&apos;s
          nature&apos;s magic potion, providing healthy hydration &ndash;
          wherever you are, whatever you&apos;re doing.
        </motion.p>
      </div>
    </section>
  );
}
