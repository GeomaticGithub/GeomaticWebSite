import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import { getCommon } from "@/i18n/common";
import type { PartnerListT, PartnersPageT } from "../constants";
import PartnerCard from "./PartnerCard";

const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1] focus-visible:ring-offset-2";

/** One block per partner family, showing the partners themselves (logo, name, what they do). */
export default function Categories({
  data,
  lists,
  locale,
}: {
  data: PartnersPageT;
  lists: Record<string, PartnerListT>;
  locale: string;
}) {
  const common = getCommon(locale);

  return (
    <div>
      {data.categories.map((cat, i) => {
        const list = lists[cat.key];
        const partners = list?.community.cards ?? [];
        return (
          <section
            key={cat.key}
            aria-labelledby={`partners-${cat.key}`}
            className={i % 2 ? "border-y border-slate-200 bg-slate-50" : "bg-white"}
          >
            <div className="mx-auto max-w-[1440px] px-4 py-14 lg:px-6 lg:py-20">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[#005e95]">
                    {partners.length === 1 ? data.ui.countOne : data.ui.count.replace("{count}", String(partners.length))}
                  </p>
                  <h2
                    id={`partners-${cat.key}`}
                    className="mt-2 text-[28px] font-bold leading-[1.12] text-slate-900 sm:text-[36px]"
                  >
                    {cat.title}
                  </h2>
                  {list?.intro.subTitle && (
                    <p className="mt-2 text-[17px] leading-relaxed text-slate-700">{list.intro.subTitle}</p>
                  )}
                </div>
                <Link
                  href={`/${locale}${cat.link}`}
                  className={`group inline-flex shrink-0 items-center gap-2 text-[15px] font-semibold text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline ${focusRing}`}
                >
                  {data.ui.all}
                  <span className="sr-only"> : {cat.title}</span>
                  <RiArrowRightLine
                    className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                    aria-hidden
                  />
                </Link>
              </div>

              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {partners.map((p) => (
                  <PartnerCard
                    key={p.title}
                    partner={p}
                    locale={locale}
                    siteLabel={data.ui.site}
                    solutionLabel={data.ui.solution}
                    newTabNote={common.opensInNewTab}
                  />
                ))}
              </ul>
            </div>
          </section>
        );
      })}
    </div>
  );
}
