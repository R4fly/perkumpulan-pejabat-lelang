"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

export interface StatItem {
  label: string;
  value: string;
  hint?: string;
}

interface StatsProps {
  items: StatItem[];
}

export function Stats({ items }: StatsProps): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  const variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 16 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
    }),
  } as const;

  return (
    <section
      aria-label="Statistik utama"
      className="border-y border-djkn-100 bg-djkn-50"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px bg-djkn-100 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, idx) => (
          <motion.div
            key={item.label}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={variants}
            className="flex flex-col gap-1 bg-djkn-50 p-6 sm:p-8"
          >
            <span
              className={cn(
                "text-3xl font-bold tracking-tight text-djkn-800 sm:text-4xl",
              )}
            >
              {item.value}
            </span>
            <span className="text-sm font-semibold text-djkn-700">
              {item.label}
            </span>
            {item.hint ? (
              <span className="text-xs text-muted-foreground">{item.hint}</span>
            ) : null}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
