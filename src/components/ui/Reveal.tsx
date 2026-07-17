"use client";

import { ReactNode } from "react";
import { motion, Variants } from "motion/react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "span" | "li";
  once?: boolean;
};

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay,
      ease: EASE_OUT_EXPO,
    },
  }),
};

/**
 * Standard scroll-into-view reveal used across the page. Centralizing this
 * keeps the "blur-to-focus" motion signature consistent everywhere instead
 * of every section reinventing its own easing curve.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  once = true,
}: RevealProps) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      custom={delay}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

/** Wraps a list of children, staggering each Reveal-marked child's entrance. */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}
