"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CurvedBottom } from "./CurvedBottom";
import { fadeInUp, fadeIn } from "@/lib/motion";

export function ContactHero() {
  return (
    <section className="relative min-h-[68svh] w-full overflow-hidden md:min-h-[74svh]">
      <Image
        src="/assets/bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0f3ad0]/55 via-[#1b4ef5]/25 to-[#1b4ef5]/10" />

      <div className="mx-auto flex min-h-[68svh] max-w-[1400px] flex-col justify-center px-5 pb-24 pt-[clamp(150px,22vh,230px)] sm:px-8 md:min-h-[74svh]">
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.1 }}
          className="font-display text-sm font-semibold uppercase tracking-[0.28em] text-cream drop-shadow-[0_1px_8px_rgba(0,0,0,0.35)]"
        >
          We&apos;d love to hear from you
        </motion.p>

        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
          className="mt-3 max-w-[12ch] font-display text-[15vw] font-bold uppercase leading-[0.9] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.3)] sm:text-[11vw] xl:text-[150px]"
        >
          Get In Touch
        </motion.h1>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
          className="mt-6 max-w-[560px] text-[15px] font-medium leading-relaxed text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)] sm:text-[17px]"
        >
          Questions about our water, custom bottling, or a bulk order? Reach out
          and our team will get back to you as quickly as a mountain spring
          flows.
        </motion.p>
      </div>

      {/* White foreground wave transitioning into the sections below */}
      <CurvedBottom className="absolute inset-x-0 bottom-0 z-10 h-[16vh] min-h-[110px] w-full" />
    </section>
  );
}
