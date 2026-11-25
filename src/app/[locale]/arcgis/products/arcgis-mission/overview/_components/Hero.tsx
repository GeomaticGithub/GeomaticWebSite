"use client";

import Image from "next/image";
import type { MissionMessages } from "../constants";
import Link from "next/link";

export default function Hero({ data }: { data: MissionMessages["hero"] }) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-0" >
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold text-gray-900">
            {data.title}
          </h1>
          <p className="mt-3 text-gray-700 leading-relaxed max-w-xl">
            {data.subtitle}
          </p>
          <Link
            href={data.ctaLink}
            className="mt-3 bg-black px-4 py-[2px] text-white hover:bg-gray-800 w-fit"
          >
            {data.ctaText}
          </Link>
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
