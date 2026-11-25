import Link from "next/link";
import { RiArrowRightLine, RiArrowRightUpLine } from "react-icons/ri";
import { getCommon } from "@/i18n/common";
import { focusRing, kickerClass, type ProductsIndexMessages } from "../constants";

/** "Learn more": links to pages of this site (address starting with "/") or to esri.com. */
export default function Ctas({
  data,
  ui,
  locale,
}: {
  data: ProductsIndexMessages["ctas"];
  ui: ProductsIndexMessages["ui"];
  locale: string;
}) {
  const common = getCommon(locale);
  const cardClass = `group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_8px_24px_-12px_rgba(0,94,149,0.35)] ${focusRing}`;

  return (
    <section className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-6 lg:py-20">
        <p className={kickerClass}>
          <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
          {ui.ctasKicker}
        </p>
        <h2 className="mt-4 text-[30px] font-bold leading-[1.12] text-slate-900 sm:text-[40px]">{data.title}</h2>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {data.items.map((item) => {
            const external = item.href.startsWith("http");
            const body = (
              <>
                <h3 className="text-[20px] font-semibold leading-snug text-slate-900">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{item.desc}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[15px] font-semibold text-[#0079c1] group-hover:text-[#005e95]">
                  {ui.discover}
                  {external ? (
                    <>
                      <span className="font-normal text-slate-600">{ui.onEsri}</span>
                      <RiArrowRightUpLine className="h-4 w-4" aria-hidden />
                      <span className="sr-only"> {common.opensInNewTab}</span>
                    </>
                  ) : (
                    <RiArrowRightLine
                      className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                      aria-hidden
                    />
                  )}
                </span>
              </>
            );
            return (
              <li key={item.title}>
                {external ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={cardClass}>
                    {body}
                  </a>
                ) : (
                  // "/support-services" → "/fr-ma/support-services"; "/#secteurs" → "/fr-ma#secteurs"
                  <Link
                    href={item.href.startsWith("/#") ? `/${locale}${item.href.slice(1)}` : `/${locale}${item.href}`}
                    className={cardClass}
                  >
                    {body}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
