import Image from "next/image";
import Link from "next/link";
import { RiArrowDownLine, RiArrowRightLine } from "react-icons/ri";
import { focusRing, kickerClass, type ProductsIndexMessages } from "../constants";

export default function Hero({
  data,
  ui,
  locale,
}: {
  data: ProductsIndexMessages["hero"];
  ui: ProductsIndexMessages["ui"];
  locale: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-slate-200 bg-slate-100">
      <Image src={data.bgImage} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/85 via-white/40 to-transparent" aria-hidden />

      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-4 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:px-6 lg:py-20">
        <div className="max-w-xl">
          <p className={kickerClass}>
            <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
            {ui.kicker}
          </p>
          <h1 className="mt-4 text-[38px] font-bold leading-[1.05] text-slate-900 sm:text-[52px]">{data.title}</h1>
          <p className="mt-5 text-[18px] leading-relaxed text-slate-800">{data.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${locale}/about-geomatic/contact`}
              className={`group inline-flex items-center justify-center gap-2 bg-[#0079c1] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#005e95] ${focusRing}`}
            >
              {ui.contact}
              <RiArrowRightLine className="h-5 w-5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />
            </Link>
            <a
              href="#catalogue"
              className={`inline-flex items-center justify-center gap-2 border border-slate-500 bg-white/70 px-6 py-3.5 text-[15px] font-semibold text-slate-900 transition-colors hover:bg-white ${focusRing}`}
            >
              {ui.catalogue}
              <RiArrowDownLine className="h-5 w-5" aria-hidden />
            </a>
          </div>
        </div>

        <div className="relative mx-auto hidden aspect-[5/4] w-full max-w-[520px] lg:block" aria-hidden>
          <Image src={data.image} alt="" fill sizes="520px" className="object-contain" />
        </div>
      </div>
    </section>
  );
}
