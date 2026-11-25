"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  data: {
    title: string;
    cards: {
      title: string;
      desc: string;
      image: string;
      gradient: string;
      link: string;
      cta: string;
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
            className="grid gap-0 md:gap-6 md:grid-cols-2 items-center"
          >
            <div className="relative min-h-[600px] bg-white">
              <Image
                src={c.image}
                alt={c.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="bg-slate-100 h-full flex items-center">
              <div className="p-12">
                <h3 className="text-4xl font-semibold text-slate-900">
                  {c.title}
                </h3>
                <p className="mt-2 text-slate-600">{c.desc}</p>
                <Link
                  href={c.link}
                  target="_blank"
                  className="mt-4 inline-flex items-center gap-2 border border-blue-600 px-3 py-1.5 text-sm text-blue-600 hover:bg-slate-50"
                >
                  {c.cta} <span aria-hidden>🔗</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
