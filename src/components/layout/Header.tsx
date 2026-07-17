"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Header() {
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setCondensed(latest > 48);
  });

  // Scrollspy: highlight the nav link for whichever section is in view.
  useEffect(() => {
    const sections = nav
      .map((n) => document.querySelector(n.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out",
          condensed
            ? " bg-ink/80 backdrop-blur-lg border-b border-ink-line"
            : " bg-transparent"
        )}
      >
        <div className="mx-auto flex  items-center justify-between px-6 md:px-10">
          <a
            href="#"
            className="font-display text-xl tracking-tight text-paper"
          >
            <Image src="/Logo.png" alt="" width={100} height={100}></Image>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors duration-300",
                  active === item.href
                    ? "text-ember"
                    : "text-paper-dim hover:text-paper"
                )}
              >
                {item.label}
                {active === item.href && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 h-px w-full bg-ember"
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <ThemeToggle />
            <Button href="#join" variant="primary" className="!px-5 !py-2.5 !text-xs">
              Join the community
            </Button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-line text-paper"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-ink px-8 md:hidden"
          >
            <nav className="flex flex-col gap-2">
              {nav.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl text-paper py-3 border-b border-ink-line active:text-ember"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * nav.length, duration: 0.5 }}
              className="mt-10"
            >
              <Button
                href="#join"
                onClick={() => setMenuOpen(false)}
                className="w-full"
              >
                Join the community
              </Button>
              <p className="mt-6 text-xs text-paper-dim">{site.fullName}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
