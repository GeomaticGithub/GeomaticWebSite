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
            className={`grid md:grid-cols-2 items-stretch ${
              i % 2 === 0 ? "" : "md:[&>div:first-child]:order-2"
            }`}
          >
            <div className="relative min-h-[600px] bg-slate-200">
              <Image
                src={c.image}
                alt={c.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex items-center">
              <div  className="p-8 md:p-16 lg:p-24">
                <h3 className="text-2xl md:text-3xl font-semibold text-slate-900">
                  {c.title}
                </h3>
                <div className="mt-3">
                  <Link
                    href={c.link}
                    target={c.link.startsWith("http") ? "_blank" : undefined}
                    className="inline-flex items-center gap-2 border border-blue-600 px-2.5 py-1 text-sm text-blue-600 hover:bg-slate-50"
                  >
                    {c.desc}
                    <span aria-hidden>📄</span>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
