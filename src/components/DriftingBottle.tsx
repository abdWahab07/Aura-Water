"use client";

import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

/** Per-bottle motion so each one enters from a different side and drifts on
 * its own path as the section scrolls. Values are percentages of the bottle's
 * own size; `enterX`/`startY` set where it flies in from before the scroll. */
export type DriftConfig = {
  enterX: number;
  startY: number;
  swayA: number;
  swayB: number;
  rotateA: number;
  rotateB: number;
};

export const SINGLE_DRIFT: DriftConfig = {
  enterX: 55,
  startY: -135,
  swayA: -12,
  swayB: 8,
  rotateA: -6,
  rotateB: 4,
};

// Distinct entrances: from the left, from high up the middle, and from the
// lower right — each with its own sway and tilt.
export const GROUP_DRIFTS: DriftConfig[] = [
  { enterX: -120, startY: -80, swayA: -16, swayB: 10, rotateA: -8, rotateB: 6 },
  { enterX: 12, startY: -180, swayA: 13, swayB: -8, rotateA: 7, rotateB: -5 },
  { enterX: 130, startY: 30, swayA: 20, swayB: -13, rotateA: 11, rotateB: -7 },
];

export function DriftingBottle({
  progress,
  config,
  reverse = false,
  /** When true (default) the bottle rises high out of its slot the way the
   * home-page still section floats it above the panel. When false it settles
   * gently into place — better suited to an inline row of bottles. */
  float = true,
  className = "",
  style,
  children,
}: {
  progress: MotionValue<number>;
  config: DriftConfig;
  reverse?: boolean;
  float?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  // Mirror the horizontal motion for the reversed (right-hand) layout.
  const dir = reverse ? -1 : 1;

  const opacity = useTransform(progress, [0, 0.2], [0, 1]);
  const x = useTransform(
    progress,
    [0, 0.2, 0.5, 0.75, 1],
    [
      `${config.enterX * dir}%`,
      "0%",
      `${config.swayA * dir}%`,
      `${config.swayB * dir}%`,
      "0%",
    ],
  );
  const y = useTransform(
    progress,
    [0, 0.2, 1],
    float ? [`${config.startY}%`, "-135%", "0%"] : [`${config.startY}%`, "-10%", "0%"],
  );
  const rotate = useTransform(
    progress,
    [0.2, 0.5, 0.75, 1],
    [0, config.rotateA * dir, config.rotateB * dir, 0],
  );

  return (
    <motion.div style={{ x, y, rotate, opacity, ...style }} className={className}>
      {children}
    </motion.div>
  );
}
