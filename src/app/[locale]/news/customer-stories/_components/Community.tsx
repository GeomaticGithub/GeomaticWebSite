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
            className={`grid md:grid-cols-2 items-center bg-[#F3F3F3] ${
              i % 2 === 0 ? "" : "md:[&>div:first-child]:order-2"
            }`}
          >
            {/* Logo / visual */}
            <div className="relative min-h-[600px] bg-slate-100">
              <Image
                src={c.image}
                alt={c.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Text block */}
            <div className="p-8 md:px-16 lg:px-24">
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900">
                {c.title}
              </h3>
              <p className="mt-2 text-slate-600">{c.desc}</p>
              <div className="mt-4">
                <Link
                  href={c.link}
                  target={c.link.startsWith("http") ? "_blank" : undefined}
                  className="inline-flex items-center gap-2 border border-blue-600 px-3 py-1.5 text-sm text-blue-600 hover:bg-slate-50"
                >
                  {c.cta} <span aria-hidden>📄</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
