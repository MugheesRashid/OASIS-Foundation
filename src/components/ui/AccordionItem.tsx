"use client";

import { useId } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const id = useId();

  return (
    <div className="border-b border-ink-line">
      <button
        id={`faq-trigger-${id}`}
        aria-expanded={isOpen}
        aria-controls={`faq-panel-${id}`}
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-6 text-left group"
      >
        <span
          className={cn(
            "font-display text-lg md:text-xl transition-colors duration-300",
            isOpen ? "text-ember" : "text-paper group-hover:text-ember-soft"
          )}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className={cn(
            "shrink-0 rounded-full border p-2 transition-colors duration-300",
            isOpen
              ? "border-ember text-ember"
              : "border-ink-line text-paper-dim"
          )}
        >
          <Plus size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-panel-${id}`}
            role="region"
            aria-labelledby={`faq-trigger-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="overflow-hidden"
          >
            <p className="pb-6 pr-10 text-paper-dim leading-relaxed max-w-2xl">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
