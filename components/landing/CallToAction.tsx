"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface CtaProps {
  title: string;
  description: string;
  primaryCta: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
}

export function CallToAction({
  title,
  description,
  primaryCta,
  secondaryCta,
}: CtaProps): React.JSX.Element {
  const reduceMotion = useReducedMotion();
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl border border-djkn-100 bg-djkn-50 p-8 sm:p-12"
        >
          <div className="grid items-center gap-8 md:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-djkn-800 sm:text-3xl">
                {title}
              </h2>
              <p className="mt-3 max-w-2xl text-base text-djkn-800/80">
                {description}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Button asChild size="lg">
                <Link href={primaryCta.href}>
                  {primaryCta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              {secondaryCta ? (
                <Button asChild size="lg" variant="outline">
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
