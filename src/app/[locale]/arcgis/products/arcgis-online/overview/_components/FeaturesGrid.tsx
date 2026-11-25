import Image from "next/image";
import type { IconType } from "react-icons";
import { RiArrowRightLine, RiBarChartBoxLine, RiDatabase2Line, RiMap2Line, RiShareLine } from "react-icons/ri";
import SmartLink, { linkKind } from "./SmartLink";
import { focusRing, kickerClass, type AOOverviewMessages } from "../constants";

const ICONS: Record<string, IconType> = {
  map: RiMap2Line,
  share: RiShareLine,
  analyze: RiBarChartBoxLine,
  data: RiDatabase2Line,
};

/** "The power of ArcGIS Online": picture, then the four capabilities. */
export default function FeaturesGrid({
  power,
  features,
  ui,
  locale,
}: {
  power: AOOverviewMessages["power"];
  features: AOOverviewMessages["features"];
  ui: AOOverviewMessages["ui"];
  locale: string;
}) {
  return (
    <section id="fonctionnalites" className="scroll-mt-16 bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-6 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className={`${kickerClass} text-[#005e95]`}>
              <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
              {ui.powerKicker}
            </p>
            <h2 className="mt-4 text-[30px] font-bold leading-[1.12] text-slate-900 sm:text-[40px]">{power.title}</h2>
          </div>
          <div className="relative aspect-[16/7] w-full">
            <Image src={power.image} alt={power.imageAlt} fill sizes="(min-width: 1024px) 680px, 100vw" className="object-contain object-right" />
          </div>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.items.map((item) => {
            const Icon = ICONS[item.icon] ?? RiMap2Line;
            const linked = linkKind(item.href) !== "none";
            return (
              <li key={item.title} className="flex flex-col rounded-lg border border-slate-200 bg-white p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-[#0079c1]/[0.08] text-[#0079c1]" aria-hidden>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-[19px] font-semibold leading-snug text-slate-900">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{item.desc}</p>
                {linked && (
                  <SmartLink
                    href={item.href}
                    locale={locale}
                    className={`group mt-auto inline-flex items-center gap-2 self-start pt-5 text-[15px] font-semibold text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline ${focusRing}`}
                  >
                    {item.linkText}
                    <RiArrowRightLine className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
                  </SmartLink>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
