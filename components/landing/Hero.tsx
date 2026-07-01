"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
}

/**
 * Animated hero block for the landing page. Splits the headline into
 * separate lines so each line can fade/slide in with a small stagger.
 */
export function Hero({
  title,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
}: HeroProps): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const lines = title.split("\n");

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  } as const;

  const lineVariants = {
    hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
    visible: reduceMotion
      ? { opacity: 1, transition: { duration: 0.4 } }
      : { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  } as const;

  return (
    <section className="relative overflow-hidden bg-djkn-900 text-djkn-50">
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 opacity-70",
          "bg-[radial-gradient(ellipse_at_top_right,_var(--djkn-500)_0%,_transparent_55%),radial-gradient(ellipse_at_bottom_left,_var(--djkn-700)_0%,_transparent_50%)]",
        )}
      />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p
            variants={lineVariants}
            className="mb-3 text-sm font-semibold uppercase tracking-widest text-djkn-200"
          >
            {subtitle}
          </motion.p>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            {lines.map((line, idx) => (
              <motion.span key={idx} variants={lineVariants} className="block">
                {line}
              </motion.span>
            ))}
          </h1>
          <motion.p
            variants={lineVariants}
            className="mt-6 max-w-2xl text-base text-djkn-100/90 sm:text-lg"
          >
            {description}
          </motion.p>
          <motion.div
            variants={lineVariants}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg" variant="secondary">
              <a href={primaryCta.href}>
                {primaryCta.label}
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a
                href={secondaryCta.href}
                className="border-djkn-200 bg-transparent text-djkn-50 hover:bg-djkn-800 hover:text-djkn-50"
              >
                {secondaryCta.label}
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
