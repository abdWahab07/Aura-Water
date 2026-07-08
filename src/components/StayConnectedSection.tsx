"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { fadeInUp, fadeIn } from "@/lib/motion";
import { InstagramIcon } from "@/components/SocialIcons";

type Reel = {
  /** Public URL the card links to. */
  href: string;
  /** Instagram embed URL used for the preview iframe. */
  embed: string;
  label: string;
  /** Raise the card for a staggered, editorial layout. */
  featured?: boolean;
};

const REELS: Reel[] = [
  {
    href: "https://www.instagram.com/reel/DahImztOi8H/?igsh=NWI0aGM4NHh2OGVp",
    embed: "https://www.instagram.com/reel/DahImztOi8H/embed",
    label: "Refined by nature",
  },
  {
    href: "https://www.instagram.com/p/Daev_ngDuNp/?igsh=anQycWwyNHJkYWw5",
    embed: "https://www.instagram.com/p/Daev_ngDuNp/embed",
    label: "Pure hydration",
    featured: true,
  },
  {
    href: "https://www.instagram.com/p/DYSvQSCjljC/?igsh=cW40YjVjOTVmZHBi",
    embed: "https://www.instagram.com/p/DYSvQSCjljC/embed",
    label: "Behind the bottle",
  },
];

export function StayConnectedSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <motion.span
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="block text-center font-display text-sm font-semibold uppercase tracking-[0.22em] text-[#1b4ef5]"
        >
          Follow Our Journey
        </motion.span>

        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-3 text-center font-display text-4xl font-bold uppercase tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
        >
          Stay Connected With Us
        </motion.h2>

        <motion.p
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-5 max-w-xl text-center text-[15px] leading-relaxed text-slate-600 sm:text-base"
        >
          Catch our latest reels and moments on Instagram. Tap any clip to watch
          it over on our page.
        </motion.p>

        <div className="mt-12 flex flex-col items-center justify-center gap-8 md:mt-16 md:flex-row md:items-center">
          {REELS.map((reel, i) => (
            <motion.a
              key={reel.href}
              href={reel.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch "${reel.label}" on Instagram`}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className={`group relative block w-full max-w-[340px] overflow-hidden rounded-3xl border-2 border-[#1b4ef5]/15 bg-slate-100 shadow-[0_25px_60px_-35px_rgba(0,0,0,0.45)] transition-colors hover:border-[#1b4ef5] ${
                reel.featured ? "md:-translate-y-6" : ""
              }`}
            >
              <div className="relative aspect-[9/16] w-full">
                {/* Instagram preview */}
                <iframe
                  src={reel.embed}
                  title={reel.label}
                  loading="lazy"
                  scrolling="no"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                />

                {/* Overlay makes the whole card a link to the reel */}
                <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-black/55 via-transparent to-black/10 opacity-90 transition-opacity group-hover:opacity-100">
                  <div className="flex items-center justify-between p-4">
                    <span className="flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.06em] text-[#1b4ef5]">
                      <InstagramIcon className="h-3.5 w-3.5" />
                      Reel
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-[#1b4ef5] shadow-lg transition-transform group-hover:scale-110">
                      <Play className="h-5 w-5 translate-x-[1px] fill-current" strokeWidth={1.5} />
                    </span>
                  </div>

                  <div className="p-5">
                    <p className="font-display text-lg font-bold uppercase tracking-tight text-white drop-shadow-[0_1px_6px_rgba(0,0,0,0.4)]">
                      {reel.label}
                    </p>
                    <span className="mt-1 inline-block text-xs font-semibold uppercase tracking-[0.08em] text-white/80">
                      Watch on Instagram
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 flex justify-center"
        >
          <a
            href="https://www.instagram.com/aurawater_pk?igsh=MW1ydTgybmtuYzdqdw%3D%3D&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1b4ef5] px-8 py-3.5 font-display text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-colors hover:bg-[#1740c9]"
          >
            <InstagramIcon className="h-4 w-4" />
            Follow @aurawater_pk
          </a>
        </motion.div>
      </div>
    </section>
  );
}
