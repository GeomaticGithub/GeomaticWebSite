import Image from "next/image";
import type { IconType } from "react-icons";
import { RiCloudLine, RiRocket2Line, RiShieldCheckLine } from "react-icons/ri";
import { kickerClass, type AOOverviewMessages } from "../constants";

const ICONS: IconType[] = [RiCloudLine, RiShieldCheckLine, RiRocket2Line];

/** "Designed for your success": one picture and the three strengths, all visible at once. */
export default function DesignedSection({
  designed,
  ui,
}: {
  designed: AOOverviewMessages["designed"];
  ui: AOOverviewMessages["ui"];
}) {
  const picture = designed.tabs[0];

  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-[1440px] items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:gap-16 lg:px-6 lg:py-24">
        <div className="relative">
          <div className="absolute -bottom-4 -left-4 hidden h-2/3 w-2/3 rounded-lg bg-[#0079c1]/10 sm:block" aria-hidden />
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[#07131f] shadow-[0_24px_48px_-24px_rgba(7,19,31,0.45)]">
            {picture && (
              <Image src={picture.image} alt={picture.imageAlt} fill sizes="(min-width: 1024px) 680px, 100vw" className="object-cover" />
            )}
          </div>
        </div>

        <div>
          <p className={`${kickerClass} text-[#005e95]`}>
            <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
            {ui.designedKicker}
          </p>
          <h2 className="mt-4 text-[30px] font-bold leading-[1.12] text-slate-900 sm:text-[40px]">{designed.title}</h2>

          <ul className="mt-8 space-y-6">
            {designed.tabs.map((tab, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <li key={tab.title} className="flex gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white text-[#0079c1] ring-1 ring-slate-200" aria-hidden>
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h3 className="text-[19px] font-semibold leading-snug text-slate-900">{tab.title}</h3>
                    <p className="mt-1.5 text-[16px] leading-relaxed text-slate-700">{tab.desc}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
