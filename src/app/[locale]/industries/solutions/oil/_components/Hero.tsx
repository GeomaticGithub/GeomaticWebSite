"use client";

import Image from "next/image";
import type { AssetPageT } from "../constants";

export default function Hero({ data }: { data: AssetPageT["hero"] }) {
  return (
    <section className="relative overflow-hidden text-white min-h-[40vh] lg:min-h-[50vh]">
      <div className="absolute inset-0 z-0">
        <Image
          src={data.bgGraphic}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60 -z-5"></div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-16 lg:py-24 min-h-[40vh] lg:min-h-[50vh] grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-semibold leading-tight">
            {data.title}
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-semibold leading-tight">
            {data.subTitle}
          </h1>
        </div>
      </div>
    </section>
  );
}
