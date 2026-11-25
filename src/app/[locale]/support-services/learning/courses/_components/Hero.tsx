"use client";

import Image from "next/image";

type Props = {
  data: {
    title: string;
    description?: string;
    bgGraphic: string;
  };
};

export default function Hero({ data }: Props) {
  return (
    <section className="relative isolate">
      <div className="relative h-[360px] md:h-[480px]">
        <Image
          src={data.bgGraphic}
          alt={data.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 to-black/30" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-4 h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-semibold text-slate-900 w-2/5">
            {data.title}
          </h1>
          <p className="mt-3 max-w-2xl text-slate-700">{data.description}</p>
        </div>
      </div>
    </section>
  );
}
