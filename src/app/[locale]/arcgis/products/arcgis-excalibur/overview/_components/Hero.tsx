"use client";

import Image from "next/image";
import type { ExcaliburMessages } from "../constants";

export default function Hero({ data }: { data: ExcaliburMessages["hero"] }) {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={data.bgGraphic}
        alt=""
        fill
        className="object-cover -z-20"
        priority
      />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <Image
            src={data.icon}
            alt="ArcGIS Hub"
            width={52}
            height={52}
            priority
          />
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold text-gray-900">
            {data.title}
          </h1>
          <p className="mt-3 text-gray-700 leading-relaxed max-w-xl">
            {data.subtitle1}
          </p>
          <p className="mt-3 text-gray-700 leading-relaxed max-w-xl">
            {data.subtitle2}
          </p>
        </div>
        <div className="relative h-[320px] md:h-[380px] lg:h-[420px]">
          <Image
            src={data.image}
            alt="ArcGIS for Developers"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
