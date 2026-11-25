"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  data: {
    title: string;
    cards: {
      title: string;
      desc?: string;
      image: string;
      gradient?: string;
      link: string;
      cta?: string;
    }[];
  };
};

export default function Community({ data }: Props) {
  return (
    <section className="bg-white">
      <div className="mx-auto">
        {data.cards.map((c, i) => (
          <article
            key={i}
            className={`grid gap-6 md:grid-cols-2 items-center ${
              i % 2 === 0 ? "" : "md:[&>div:first-child]:order-2"
            }`}
          >
            <div className="relative min-h-[600px] bg-amber-200">
              <Image
                src={c.image}
                alt={c.title}
                fill
                className="object-cover"
              />
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-900">
                {c.title}
              </h3>
              <p className="mt-2 text-slate-600 text-sm">{c.desc}</p>
              <div className="mt-4">
                <Link
                  href={c.link}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-blue-600 border border-blue-600 px-3 py-1.5 text-sm hover:bg-slate-50"
                >
                  {c.cta} 📄
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
