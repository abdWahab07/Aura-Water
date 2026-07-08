"use client";

import { motion } from "framer-motion";
import { MountainBackground } from "./MountainBackground";
import { CurvedBottom } from "./CurvedBottom";
import { BottleSection } from "./BottleSection";
import { fadeInUp } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      <MountainBackground />

      {/* Hero copy */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col items-center px-5 pt-[18vh] text-center sm:px-8 sm:pt-[16vh] md:pt-[17vh]">
        <motion.h1
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
          className="font-display text-[9vw] font-bold uppercase leading-[0.95] tracking-tight text-cream drop-shadow-[0_2px_20px_rgba(0,0,0,0.25)] sm:whitespace-nowrap md:text-[7.5vw] xl:text-[140px]"
        >
          Refined by Nature
        </motion.h1>
      </div>

      {/* White foreground wave */}
      <CurvedBottom className="absolute inset-x-0 bottom-0 z-10 h-[24vh] min-h-[150px] w-full" />

      {/* Bottles standing on the wave */}
      <BottleSection />

      {/* Bottom-right WhatsApp button */}
      <motion.a
        href="https://wa.me/923066600133"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#1b4ef5] text-white shadow-lg sm:right-8 md:h-12 md:w-12"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </motion.a>
    </section>
  );
}
