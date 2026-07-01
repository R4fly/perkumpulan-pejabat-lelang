import Link from "next/link";

interface CallToActionProps {
  title: string;
  description: string;
  primaryCta: { href: string; label: string };
  secondaryCta: { href: string; label: string };
}

export function CallToAction({ title, description, primaryCta, secondaryCta }: CallToActionProps) {
  return (
    <section className="py-20 bg-djkn-700 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-djkn-100 max-w-2xl mx-auto mb-8">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={primaryCta.href} className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-base font-medium text-djkn-700 shadow transition-colors hover:bg-djkn-50">
            {primaryCta.label}
          </Link>
          <Link href={secondaryCta.href} className="inline-flex items-center justify-center rounded-md border border-white bg-transparent px-8 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-djkn-600">
            {secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}