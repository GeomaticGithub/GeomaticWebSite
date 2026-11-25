// The cards that lead to the three kinds of publications. Used by the overview page and,
// at the bottom of each publication page, for the two other kinds.
import Link from "next/link";
import type { IconType } from "react-icons";
import { RiArrowRightLine, RiBookOpenLine, RiChatQuoteLine, RiMailSendLine } from "react-icons/ri";
import { focusRing } from "@/app/[locale]/arcgis/products/_shared/blocks";

export type NewsKey = "stories" | "ebook" | "newsletter";
export type NewsCard = {
  key: NewsKey;
  /** "{count}" is replaced by the number of customer stories */
  desc: string;
  badge?: string;
  link: string;
  cta: string;
};

const ICONS: Record<NewsKey, IconType> = { stories: RiChatQuoteLine, ebook: RiBookOpenLine, newsletter: RiMailSendLine };
/** Name of each kind in the menu labels (nav.links of home.json), so a card and its menu entry read the same. */
const LABEL_KEYS: Record<NewsKey, string> = { stories: "customerStories", ebook: "ebooks", newsletter: "newsletters" };

export default function NewsCards({
  cards,
  labels,
  locale,
  storyCount,
}: {
  cards: NewsCard[];
  labels: Record<string, string>;
  locale: string;
  storyCount: number;
}) {
  const cols = cards.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <ul className={`mt-10 grid gap-5 ${cols}`}>
      {cards.map((card) => {
        const Icon = ICONS[card.key];
        return (
          <li key={card.key}>
            <Link
              href={`/${locale}${card.link}`}
              className={`group flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_8px_24px_-12px_rgba(0,94,149,0.35)] sm:p-7 ${focusRing}`}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#0079c1] text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                {card.badge && (
                  <span className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-[13px] font-medium text-slate-700">{card.badge}</span>
                )}
              </span>
              <span className="mt-5 block text-[22px] font-semibold leading-snug text-slate-900 group-hover:text-[#005e95]">
                {labels[LABEL_KEYS[card.key]]}
              </span>
              <span className="mt-2 block text-[16px] leading-relaxed text-slate-700">{card.desc.replace("{count}", String(storyCount))}</span>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[15px] font-semibold text-[#0079c1] group-hover:text-[#005e95]">
                {card.cta}
                <RiArrowRightLine className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
