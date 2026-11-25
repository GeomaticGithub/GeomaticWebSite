import Image from "next/image";
import type { BAOverviewMessages } from "../constants";

export default function Hero({ hero }: { hero: BAOverviewMessages["hero"] }) {
  return (
    <section className="relative overflow-hidden">
      <Image
        src={hero.bgGraphic}
        alt=""
        fill
        className="object-cover -z-20"
        priority
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/0 via-black/10 to-black/20" />
      <div className="relative z-10 mx-auto max-w-[1440px] px-6  grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="mt-2 text-4xl md:text-5xl font-semibold text-gray-900">
            {hero.title}
          </h1>
          <p className="mt-3 text-gray-700 leading-relaxed max-w-xl">
            {hero.subtitle}
          </p>
        </div>
        <div className="relative h-[320px] md:h-[380px] lg:h-[450px]">
          <Image
            src={hero.rightImage}
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
