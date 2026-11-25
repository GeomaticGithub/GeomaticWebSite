import Image from "next/image";
import type { ProOverviewMessages } from "../constants";

export default function HeroSection({ hero }: { hero: ProOverviewMessages["hero"] }) {
  return (
    <section className="relative overflow-hidden md:h-[700px]">
      <div className="absolute inset-0 -z-10">
        <Image src={hero.bgImage} alt="" fill className="object-cover" />
      </div>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-2 gap-10 px-6 py-14 md:h-[700px]">
        <div className="text-black flex flex-col justify-center">
          <Image src={hero.logoImage} alt={hero.mediaAlt} width={60} height={60} className="object-contain" priority />
          <h1 className="text-4xl md:text-5xl font-bold mt-2">{hero.title}</h1>
          <p className="mt-3 text-black/85">{hero.subtitle}</p>
        </div>

        <div className="relative lg:h-fill">
          <Image src={hero.mediaImage} alt={hero.mediaAlt} fill className="object-contain" priority />
        </div>
      </div>
    </section>
  );
}
