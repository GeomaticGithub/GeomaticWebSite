"use client";
import Image from "next/image";
import type { MarketPageT } from "../constants";

export default function Hero({ data }: { data: MarketPageT["hero"] }) {
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
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-0">
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold ">
            {data.title}
          </h1>
          <p className="mt-3 leading-relaxed max-w-xl">{data.subtitle1}</p>
          <p className="mt-3 leading-relaxed max-w-xl">{data.subtitle2}</p>
        </div>
        <div className="relative h-[320px] md:h-[380px] lg:h-[600px]">
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
