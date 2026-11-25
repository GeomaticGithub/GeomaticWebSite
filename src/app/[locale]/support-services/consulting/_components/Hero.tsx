"use client";

import Image from "next/image";

type Props = {
  data: {
    title: string;
    subtitle?: string;
    image?: string;
    bgGraphic: string;
  };
};

export default function Hero({ data }: Props) {
  return (
    <section className="relative isolate">
      <div className="relative h-[420px] md:h-[500px]">
        <Image
          src={data.bgGraphic}
          alt={data.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-emerald-900/20" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-4 text-white h-full flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-semibold">{data.title}</h1>
          <p className="mt-3 max-w-[1440px] text-sm md:text-base opacity-90">
            {data.subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
