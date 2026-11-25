"use client";

import Image from "next/image";
import type { AssetPageT } from "../constants";

export default function Hero({ data }: { data: AssetPageT["hero"] }) {
  return (
    <section className="relative overflow-hidden text-black">
      <div className="absolute inset-0 -z-10">
        <Image
          src={data.bgGraphic}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-black/30 -z-5"></div>
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-0">
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold ">
            {data.title}
          </h1>
        </div>
        <div className="relative h-[320px] md:h-[380px] lg:h-[500px]">
          <Image
            src={data.image}
            alt="ArcGIS Maps for Microsoft Power BI"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
