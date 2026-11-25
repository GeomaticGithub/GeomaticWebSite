import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine, RiArrowRightUpLine } from "react-icons/ri";
import { getCommon } from "@/i18n/common";
import { focusRing, kickerClass, resolveProductLink, type ProductsIndexMessages } from "../constants";

/** Highlighted products, as compact rows: icon, name, one line. */
export default function Featured({
  data,
  ui,
  locale,
}: {
  data: ProductsIndexMessages["featured"];
  ui: ProductsIndexMessages["ui"];
  locale: string;
}) {
  const common = getCommon(locale);

  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-6 lg:py-20">
        <p className={kickerClass}>
          <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
          {ui.featuredKicker}
        </p>
        <h2 className="mt-4 text-[30px] font-bold leading-[1.12] text-slate-900 sm:text-[40px]">{data.title}</h2>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.cards.map((card) => {
            const { href, external } = resolveProductLink(card.title, card.href, locale);
            const className = `group flex h-full items-start gap-4 rounded-lg border border-slate-200 bg-white p-5 transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_8px_24px_-12px_rgba(0,94,149,0.35)] ${focusRing}`;
            const body = (
              <>
                <Image src={card.icon} alt="" width={48} height={48} className="h-12 w-12 shrink-0 object-contain" />
                <span className="min-w-0 flex-1">
                  <span className="block text-[18px] font-semibold leading-snug text-slate-900">{card.title}</span>
                  <span className="mt-1 block text-[15px] leading-relaxed text-slate-700">{card.subtitle}</span>
                </span>
                {external ? (
                  <>
                    <RiArrowRightUpLine className="mt-1 h-5 w-5 shrink-0 text-slate-500 group-hover:text-[#0079c1]" aria-hidden />
                    <span className="sr-only"> {common.opensInNewTab}</span>
                  </>
                ) : (
                  <RiArrowRightLine className="mt-1 h-5 w-5 shrink-0 text-[#0079c1] transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
                )}
              </>
            );
            return (
              <li key={card.title}>
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
