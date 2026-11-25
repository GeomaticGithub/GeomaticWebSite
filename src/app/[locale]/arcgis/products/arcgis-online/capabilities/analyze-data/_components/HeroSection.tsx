import Image from "next/image";
import type { AnalyzeMsgs } from "../constants";

export default function HeroSection({ hero }: { hero: AnalyzeMsgs["hero"] }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image src={hero.bgGraphic} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#2C5CF6]/20" />
      </div>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 px-6 pt-14 pb-10 lg:grid-cols-2">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{hero.title}</h1>
          <p className="mt-2 text-white/90">{hero.subtitle}</p>
        </div>

        <div className="relative h-[260px] md:h-[360px] lg:h-[420px]">
          <Image src={hero.mediaImage} alt={hero.mediaAlt} fill className="object-cover rounded-md" priority />
        </div>
      </div>
    </section>
  );
}
