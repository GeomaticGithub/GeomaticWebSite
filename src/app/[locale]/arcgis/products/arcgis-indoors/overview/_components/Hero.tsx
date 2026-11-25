"use client";

import Image from "next/image";
import type { IndoorsMessages } from "../constants";
import Link from "next/link";

export default function Hero({ data }: { data: IndoorsMessages["hero"] }) {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={data.bgGraphic}
        alt=""
        fill
        className="absolute inset-0 -z-10 object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/10 to-black/40 -z-10" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4">
          {data.icon && (
            <Image
              src={data.icon}
              alt="ArcGIS Indoors"
              width={60}
              height={60}
              className=""
              priority
            />
          )}
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            {data.title}
          </h1>
          <p className="text-gray-700 leading-relaxed max-w-xl">
            {data.subtitle}
          </p>
          <Link
            href={data.ctaLink}
            className="bg-black px-4 py-[2px] text-white hover:bg-gray-800 w-fit"
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
