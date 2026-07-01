import Link from "next/link";

interface HeroProps {
  subtitle: string;
  title: string;
  description: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
}

export function Hero({ subtitle, title, description, primaryCta, secondaryCta }: HeroProps) {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-djkn-50 to-background">
      <div className="container mx-auto px-4 text-center">
        <p className="text-djkn-600 font-semibold mb-4 uppercase tracking-wide">{subtitle}</p>
        <h1 className="text-4xl md:text-6xl font-bold text-djkn-800 mb-6 whitespace-pre-line">
          {title}
        </h1>
        <p className="text-lg text-djkn-700 max-w-2xl mx-auto mb-8">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryCta.href} className="inline-flex items-center justify-center rounded-md bg-djkn-700 px-8 py-3 text-base font-medium text-white shadow transition-colors hover:bg-djkn-800">
            {primaryCta.label}
          </Link>
          <Link href={secondaryCta.href} className="inline-flex items-center justify-center rounded-md border border-djkn-700 bg-transparent px-8 py-3 text-base font-medium text-djkn-700 shadow-sm transition-colors hover:bg-djkn-100">
            {secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}