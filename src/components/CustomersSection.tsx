"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, scaleIn } from "@/lib/motion";
import { AnimatedHeading, Reveal } from "./Reveal";

type Brand = {
  src: string;
  alt: string;
};

const BRANDS: Brand[] = [
  { src: "/assets/brands/aabroq.jpg", alt: "Aabroq" },
  { src: "/assets/brands/extraction.jpeg", alt: "Extraction" },
  { src: "/assets/brands/ilyas.png", alt: "Ilyas" },
  { src: "/assets/brands/pashtun.jpeg", alt: "Pashtun" },
  { src: "/assets/brands/SM.png", alt: "SM" },
];

export function CustomersSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <AnimatedHeading
          text="AURA Customers"
          className="text-center font-display text-4xl font-bold uppercase tracking-tight text-[#1b4ef5] sm:text-5xl md:text-6xl"
        />

        <Reveal
          variants={fadeIn}
          delay={0.12}
          className="mx-auto mt-5 max-w-xl text-center text-[15px] leading-relaxed text-slate-500 sm:text-base"
        >
          <p>
            Trusted by brands who put their name on our water. Here are just a few
            of the businesses we&apos;ve created custom AURA bottles for.
          </p>
        </Reveal>
      </div>

      {/* Infinite logo marquee */}
      <Reveal
        variants={scaleIn}
        delay={0.15}
        className="relative mx-auto mt-14 max-w-3xl overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent sm:w-28" />

        <motion.div
          className="flex w-max items-center gap-10 sm:gap-16"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 18,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...BRANDS, ...BRANDS].map((brand, i) => (
            <div
              key={`${brand.src}-${i}`}
              aria-hidden={i >= BRANDS.length}
              className="relative h-24 w-40 shrink-0 sm:h-28 sm:w-52"
            >
              <Image
                src={brand.src}
                alt={brand.alt}
                fill
                sizes="(max-width: 640px) 40vw, 208px"
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </Reveal>
    </section>
  );
}
