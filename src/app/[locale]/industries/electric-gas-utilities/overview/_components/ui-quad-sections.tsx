"use client";
import type { SectionsT } from "../constants";

function Card({
  title,
  p1,
}: {
  title: string;
  p1: string;
}) {
  return (
    <div className="rounded-2xl bg-neutral-900 p-6 text-white shadow-sm ring-1 ring-black/5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-3 text-neutral-300">{p1}</p>
    </div>
  );
}

export default function QuadSections({ data }: { data: SectionsT }) {
  const items = [data.map, data.interact, data.understand, data.enrich];
  return (
    <section className="bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s, i) => (
            <Card key={i} title={s.title} p1={s.p1} />
          ))}
        </div>
      </div>
    </section>
  );
}
