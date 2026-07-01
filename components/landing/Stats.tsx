interface StatItem {
  value: string;
  label: string;
  hint: string;
}

interface StatsProps {
  items: StatItem[];
}

export function Stats({ items }: StatsProps) {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((item, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-djkn-700">{item.value}</p>
              <p className="text-lg font-semibold text-djkn-800 mt-2">{item.label}</p>
              <p className="text-sm text-djkn-600 mt-1">{item.hint}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}