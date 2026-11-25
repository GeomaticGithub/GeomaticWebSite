import Image from "next/image";
import { RiArrowRightLine, RiArrowRightUpLine } from "react-icons/ri";
import { getCommon } from "@/i18n/common";
import SmartLink, { linkKind } from "./SmartLink";
import { kickerClass, type AOOverviewMessages } from "../constants";

/** "Expand your work": four related products, on the dark brand colour. */
export default function ExpandWorkSection({
  expand,
  ui,
  locale,
}: {
  expand: AOOverviewMessages["expand"];
  ui: AOOverviewMessages["ui"];
  locale: string;
}) {
  const common = getCommon(locale);

  return (
    <section className="relative isolate overflow-hidden bg-[#07131f] text-white">
      <Image src={expand.bgImage} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-30" />

      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-6 lg:py-24">
        <p className={`${kickerClass} text-sky-300`}>
          <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
          {ui.expandKicker}
        </p>
        <h2 className="mt-4 text-[30px] font-bold leading-[1.12] sm:text-[40px]">{expand.title}</h2>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {expand.cards.map((card) => {
            const kind = linkKind(card.href);
            return (
              <li key={card.title}>
                <SmartLink
                  href={card.href}
                  locale={locale}
                  className="group flex h-full flex-col rounded-lg border border-white/10 bg-[#0b1d2e]/90 p-5 transition-colors duration-200 hover:border-sky-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07131f]"
                >
                  <span className="relative block aspect-[4/3]">
                    <Image
                      src={card.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                      className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </span>
                  <span className="mt-4 block text-[19px] font-semibold leading-snug">{card.title}</span>
                  <span className="mt-2 block text-[15px] leading-relaxed text-slate-300">{card.desc}</span>
                  {kind !== "none" && (
                    <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[15px] font-semibold text-sky-300 group-hover:text-sky-200">
                      {card.linkText}
                      {kind === "external" ? (
                        <>
                          <RiArrowRightUpLine className="h-4 w-4 shrink-0" aria-hidden />
                          <span className="sr-only"> {common.opensInNewTab}</span>
                        </>
                      ) : (
                        <RiArrowRightLine className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
                      )}
                    </span>
                  )}
                </SmartLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
