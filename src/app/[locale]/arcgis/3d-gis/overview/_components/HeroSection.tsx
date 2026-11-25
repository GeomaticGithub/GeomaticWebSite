import Image from "next/image";
import type { OverviewMessages } from "../constants";

export default function HeroSection({ hero }: { hero: OverviewMessages["hero"] }) {
  return (
    <section className="relative">
      <div className="relative h-[420px] md:h-[520px]">
        <Image
          src={hero.bgImage}
          alt={hero.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1440px] px-6">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-2">
              {hero.title ?? ""}
            </h1>
            <p className="text-white/80 text-lg">
              {hero.subtitle ?? ""}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
