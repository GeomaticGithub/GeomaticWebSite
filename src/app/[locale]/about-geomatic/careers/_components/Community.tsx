"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  data: {
    title: string;
    cards: {
      title: string;
      desc: string;
      image?: string;
      gradient?: string;
      link?: string;
      cta?: string;
    }[];
  };
};

export default function Community({ data }: Props) {
  return (
    <section>
      <div className="mx-auto">
        {data.cards
          .filter((c) => c.image) // rows with images first
          .map((c, i) => (
            <article
              key={`${c.title}-${i}`}
              className="grid md:grid-cols-2 items-stretch"
            >
              <div className={`relative min-h-[600px] ${i % 2 ? "md:order-2" : ""}`}>
                <Image
                  src={c.image!}
                  alt={c.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div
                className={`bg-slate-100 flex items-center ${
                  i % 2 ? "md:order-1" : ""
                }`}
              >
                <div className="p-8 md:p-12">
                  <h3 className="text-4xl font-semibold text-slate-900">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-slate-700">{c.desc}</p>
                </div>
              </div>
            </article>
          ))}
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10 text-center">
        <h3 className="text-xl md:text-4xl font-semibold text-slate-900">
          {data.title}
        </h3>
      </div>

      <div className="mx-auto max-w-none bg-[#2D2D2D]">
        {data.cards
          .filter((c) => !c.image)
          .map((c, i) => (
            <div
              key={`cta-${i}`}
              className={`relative py-12 text-center text-white`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${
                  c.gradient || "from-slate-800 via-slate-800 to-slate-900"
                }`}
              />
              <div className="relative z-10 mx-auto max-w-3xl px-4">
                <h4 className="text-2xl font-semibold">{c.title}</h4>
                <p className="mt-3 text-white/85">{c.desc}</p>
                {c.link && c.cta && (
                  <Link
                    href={c.link}
                    className="mt-6 inline-block border border-white/40 px-4 py-2 text-sm hover:bg-white/10"
                  >
                    {c.cta}
                  </Link>
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
