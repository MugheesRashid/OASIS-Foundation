"use client";

import { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const accentMap = {
  ember: "group-hover:shadow-[0_0_0_1px_var(--ember)]",
  signal: "group-hover:shadow-[0_0_0_1px_var(--signal)]",
  bloom: "group-hover:shadow-[0_0_0_1px_var(--bloom)]",
  good: "group-hover:shadow-[0_0_0_1px_var(--good)]",
} as const;

export function Card({
  children,
  className,
  accent = "ember",
}: {
  children: ReactNode;
  className?: string;
  accent?: keyof typeof accentMap;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group relative rounded-[var(--radius-lg)] border border-ink-line bg-ink-raised p-8 transition-shadow duration-300",
        accentMap[accent],
        className
      )}
    >
      {children}
    </motion.div>
  );
}
