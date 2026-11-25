"use client";
import type { ProductsT } from "../constants";

function Product({
  item,
}: {
  item: { category: string; title: string; desc: string; img?: string };
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <p className="text-xs uppercase tracking-wide text-neutral-500">
        {item.category}
      </p>
      <h4 className="mt-2 text-lg font-semibold">{item.title}</h4>
      <p className="mt-3 text-neutral-600">{item.desc}</p>
    </div>
  );
}

export default function Products({ data }: { data: ProductsT }) {
  const list = [
    data.online,
    data.enterprise,
    data.devtools,
    data.pro,
    data.online2,
    data.enterprise2,
    data.devtools2,
    data.pro2,
  ];
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <h2 className="text-2xl font-semibold">{data.title}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((item, i) => (
            <Product key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
