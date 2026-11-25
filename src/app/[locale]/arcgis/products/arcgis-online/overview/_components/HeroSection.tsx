import Image from "next/image";
import Link from "next/link";
import { RiArrowDownLine, RiArrowRightLine } from "react-icons/ri";
import { focusRing, kickerClass, type AOOverviewMessages } from "../constants";

export default function HeroSection({
  hero,
  intro,
  ui,
  locale,
}: {
  hero: AOOverviewMessages["hero"];
  intro: string;
  ui: AOOverviewMessages["ui"];
  locale: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200 bg-white">
      <Image src={hero.bgImage} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/80 to-white/20" aria-hidden />

      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:gap-16 lg:px-6 lg:py-20">
        <div className="max-w-xl">
          <p className={`${kickerClass} text-[#005e95]`}>
            <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
            {ui.kicker}
          </p>
          <div className="mt-5 flex items-center gap-4">
            {hero.icon && (
              <Image src={hero.icon} alt="" width={64} height={64} className="h-14 w-14 shrink-0 object-contain sm:h-16 sm:w-16" />
            )}
            <h1 className="text-[38px] font-bold leading-[1.05] text-slate-900 sm:text-[52px]">{hero.title}</h1>
          </div>
          <p className="mt-5 text-[21px] font-semibold leading-snug text-slate-900">{hero.subtitle}</p>
          <p className="mt-3 text-[17px] leading-relaxed text-slate-700">{intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/about-geomatic/contact`}
              className={`group inline-flex items-center justify-center gap-2 bg-[#0079c1] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#005e95] ${focusRing}`}
            >
              {ui.contact}
              <RiArrowRightLine className="h-5 w-5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
            </Link>
            <a
              href="#fonctionnalites"
              className={`inline-flex items-center justify-center gap-2 border border-slate-500 bg-white/80 px-6 py-3.5 text-[15px] font-semibold text-slate-900 transition-colors hover:bg-white ${focusRing}`}
            >
              {ui.features}
              <RiArrowDownLine className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/3] w-full max-w-[640px]">
          <Image
            src={hero.mediaImage}
            alt={hero.mediaAlt}
            fill
            priority
            sizes="(min-width: 1024px) 640px, 100vw"
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
