"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeInUp } from "@/lib/motion";
import { SOCIALS } from "@/components/SocialIcons";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

type FooterColumn = {
  heading: string;
  links: FooterLink[];
};

const COLUMNS: FooterColumn[] = [
  {
    heading: "Home",
    links: [{ label: "Home", href: "/" }],
  },
  {
    heading: "Products",
    links: [
      { label: "Aura Water", href: "#" },
      { label: "Custom Aura", href: "#" },
    ],
  },
  {
    heading: "Contact Us",
    links: [{ label: "Get In Touch", href: "/contact" }],
  },
];

export function Footer() {
  return (
    <footer className="relative bg-[#1b4ef5] text-white">
      {/* Curved white wave blending the page above into the footer */}
      <svg
        className="absolute inset-x-0 top-0 h-[70px] w-full -translate-y-[1px] md:h-[110px]"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,0 L1440,0 L1440,58 C1160,112 900,92 620,60 C380,32 180,70 0,48 Z"
          fill="#ffffff"
        />
      </svg>

      <div className="relative mx-auto max-w-[1400px] px-5 pb-10 pt-24 sm:px-8 md:pb-12 md:pt-36">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_2fr]">
          {/* Brand */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col items-start"
          >
            <Image
              src="/assets/logo.png"
              alt="Aura Water"
              width={1024}
              height={1536}
              className="h-36 w-auto md:h-48"
            />
            <p className="mt-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
              Refined by Nature 
            </p>
          </motion.div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <motion.div
                key={col.heading}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                <h3 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-white">
                  {col.heading}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="inline-flex items-center gap-1 text-sm text-white/75 transition-colors hover:text-white"
                      >
                        {link.label}
                        {link.external && (
                          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.2} />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col gap-6 border-t border-white/15 pt-6 md:flex-row md:items-center md:justify-between">
          {/* Socials */}
          <div className="flex items-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-[#1b4ef5]"
              >
                <Icon className="h-[18px] w-[18px]" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-xs text-white/70">
            <span>
              &copy; {new Date().getFullYear()} Aura Water Limited. All rights
              reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
