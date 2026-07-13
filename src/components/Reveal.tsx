"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import {
  fadeInUp,
  scaleIn,
  staggerContainer,
  staggerFast,
  viewportOnce,
  wordReveal,
} from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  /** Use animate instead of whileInView (for above-the-fold content). */
  immediate?: boolean;
} & Omit<HTMLMotionProps<"div">, "children" | "variants" | "initial" | "animate">;

export function Reveal({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
  immediate = false,
  ...rest
}: RevealProps) {
  const motionProps = immediate
    ? {
        initial: "hidden" as const,
        animate: "visible" as const,
      }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: viewportOnce,
      };

  return (
    <motion.div
      variants={variants}
      transition={{ delay }}
      className={className}
      {...motionProps}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type AnimatedHeadingProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  immediate?: boolean;
  /** Animate each word (default) or the whole line. */
  by?: "word" | "line";
  delay?: number;
};

export function AnimatedHeading({
  text,
  as: Tag = "h2",
  className,
  immediate = false,
  by = "word",
  delay = 0,
}: AnimatedHeadingProps) {
  const MotionTag = motion[Tag];
  const words = text.split(" ");

  const motionProps = immediate
    ? {
        initial: "hidden" as const,
        animate: "visible" as const,
      }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: viewportOnce,
      };

  if (by === "line") {
    return (
      <MotionTag
        variants={fadeInUp}
        transition={{ delay }}
        className={className}
        {...motionProps}
      >
        {text}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      variants={staggerFast}
      transition={{ delayChildren: delay }}
      className={className}
      aria-label={text}
      {...motionProps}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden">
          <motion.span variants={wordReveal} className="inline-block">
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  immediate?: boolean;
  fast?: boolean;
};

export function Stagger({
  children,
  className,
  immediate = false,
  fast = false,
}: StaggerProps) {
  const motionProps = immediate
    ? {
        initial: "hidden" as const,
        animate: "visible" as const,
      }
    : {
        initial: "hidden" as const,
        whileInView: "visible" as const,
        viewport: viewportOnce,
      };

  return (
    <motion.div
      variants={fast ? staggerFast : staggerContainer}
      className={className}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  variants = fadeInUp,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
}) {
  return (
    <motion.div variants={variants} className={className}>
      {children}
    </motion.div>
  );
}

export function ScaleReveal({
  children,
  className,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  immediate?: boolean;
}) {
  return (
    <Reveal
      variants={scaleIn}
      className={className}
      immediate={immediate}
    >
      {children}
    </Reveal>
  );
}
