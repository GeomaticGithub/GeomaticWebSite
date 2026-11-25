import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine, RiArrowRightUpLine } from "react-icons/ri";
import { getCommon } from "@/i18n/common";
import { focusRing, kickerClass, resolveProductLink, type ProductsIndexMessages } from "../constants";

/** The six core platforms, as picture cards. */
export default function Tiles({
  data,
  lead,
  ui,
  locale,
}: {
  data: ProductsIndexMessages["tiles"];
  lead: string;
  ui: ProductsIndexMessages["ui"];
  locale: string;
}) {
  const common = getCommon(locale);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-6 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className={kickerClass}>
              <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
              {ui.flagshipKicker}
            </p>
            <h2 className="mt-4 text-[30px] font-bold leading-[1.12] text-slate-900 sm:text-[40px]">
              {ui.flagshipTitle}
            </h2>
          </div>
          <p className="text-[17px] leading-relaxed text-slate-700 lg:col-span-7 lg:pt-9">{lead}</p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item) => {
            const { href, external } = resolveProductLink(item.title, item.href, locale);
            const className = `group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_12px_28px_-14px_rgba(0,94,149,0.4)] ${focusRing}`;
            const body = (
              <>
                <div className="relative h-28 overflow-hidden bg-[#07131f] sm:h-32">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 460px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
                <div className="relative flex flex-1 flex-col px-5 pb-5 pt-9">
                  <span
                    className={`absolute -top-7 left-5 flex h-14 w-14 items-center justify-center rounded-lg border shadow-sm ${
                      // white line icons (SVG) need a dark tile to be visible
                      item.icon.endsWith(".svg") ? "border-[#0b1d2e] bg-[#0b1d2e]" : "border-slate-200 bg-white"
                    }`}
                  >
                    <Image src={item.icon} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
                  </span>
                  <h3 className="text-[20px] font-semibold leading-snug text-slate-900">{item.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-slate-700">{item.subtitle}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[15px] font-semibold text-[#0079c1] group-hover:text-[#005e95]">
                    {ui.discover}
                    {external ? (
                      <>
                        <span className="font-normal text-slate-600">{ui.onEsri}</span>
                        <RiArrowRightUpLine className="h-4 w-4" aria-hidden />
                        <span className="sr-only"> {common.opensInNewTab}</span>
                      </>
                    ) : (
                      <RiArrowRightLine className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
                    )}
                  </span>
                </div>
              </>
            );
            return (
              <li key={item.title}>
                {href && !external ? (
                  <Link href={href} className={className}>
                    {body}
                  </Link>
                ) : (
                  <a href={href ?? "#catalogue"} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} className={className}>
                    {body}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
