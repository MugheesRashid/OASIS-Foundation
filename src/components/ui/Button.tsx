"use client";

import { ReactNode, useRef, MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
};

/**
 * Primary interactive control used across the site. Desktop pointers get a
 * subtle magnetic pull toward the cursor; touch devices and
 * reduced-motion users get a plain, instant hover/tap state instead.
 */
export function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className,
  type = "button",
}: ButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const prefersReduced = useReducedMotion();

  function handleMove(e: MouseEvent) {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
  }

  function handleLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0, 0)";
  }

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-[transform,background-color,color,box-shadow] duration-300 ease-out will-change-transform";

  const variants = {
    primary:
      "bg-ember text-ink hover:shadow-[0_0_0_1px_var(--ember),0_0_32px_-4px_var(--ember)] active:scale-[0.97]",
    secondary:
      "bg-transparent text-paper border border-ink-line hover:border-ember hover:text-ember active:scale-[0.97]",
    ghost:
      "bg-transparent text-paper-dim hover:text-paper px-3 py-2",
  };

  const sharedProps = {
    onClick,
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    className: cn(base, variants[variant], className),
  };

  if (href) {
    return (
      <motion.a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        {...sharedProps}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      {...sharedProps}
    >
      {children}
    </motion.button>
  );
}
