"use client";

import Image from "next/image";

type Props = {
  data: {
    title: string;
    subTitle: string;
    bgGraphic: string;
    paragraph: string;
  };
};

export default function Intro({ data }: Props) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 md:grid-cols-[1.2fr_.8fr] items-center">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
            {data.title}
          </h2>
          <p className="mt-1 text-sm uppercase tracking-wide text-slate-500">
            {data.subTitle}
          </p>
          <p className="mt-4 text-slate-700">{data.paragraph}</p>
        </div>
        <div className="relative h-52 md:h-60 rounded-2xl overflow-hidden ring-1 ring-slate-200">
          <Image
            src={data.bgGraphic}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
