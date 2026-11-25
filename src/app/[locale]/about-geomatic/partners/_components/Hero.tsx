import Image from "next/image";
import type { PartnersPageT } from "../constants";

export default function Hero({ data }: { data: PartnersPageT["hero"] }) {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200 bg-white">
      {/* The banner is white on its left side; the gradient keeps the text area clean on every width */}
      <Image
        src={data.bgGraphic}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover object-right opacity-35 lg:opacity-100"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-white via-white/85 to-white/0 lg:via-white/60"
        aria-hidden
      />

      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-6 lg:py-24">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#005e95]">
            <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
            {data.kicker}
          </p>
          <h1 className="mt-4 text-[38px] font-bold leading-[1.05] text-slate-900 sm:text-[52px]">
            {data.title}
          </h1>
          <p className="mt-5 text-[21px] font-semibold leading-snug text-slate-900">{data.lead}</p>
          <p className="mt-3 text-[17px] leading-relaxed text-slate-700">{data.description}</p>
        </div>
      </div>
    </section>
  );
}
