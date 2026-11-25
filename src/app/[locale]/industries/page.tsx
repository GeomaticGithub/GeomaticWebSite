import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import { ProductHero, SectionHead, container, focusRing } from "@/app/[locale]/arcgis/products/_shared/blocks";
import { NEEDS, SECTORS, SOLUTIONS, type CatalogEntry } from "./catalog";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/industries");

interface PageProps {
  params: Promise<{ locale: string }>;
}

type Section = { kicker: string; title: string; text: string };

const cardClass = `group flex h-full items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 sm:flex-col sm:items-stretch sm:gap-0 sm:p-6 transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_8px_24px_-12px_rgba(0,94,149,0.35)] ${focusRing}`;
const arrowClass = "h-5 w-5 shrink-0 text-[#0079c1] transition-transform group-hover:translate-x-1 motion-reduce:transition-none";

/** A card of the light sections: icon, name of the page and one line taken from that page. */
function Card({ entry, label, line, locale }: { entry: CatalogEntry; label: string; line?: string; locale: string }) {
  const Icon = entry.icon;
  return (
    // phones: one compact row (icon, texts, arrow); wider screens: a card with the icon on top
    <Link href={`/${locale}${entry.href}`} className={cardClass}>
      <span className="flex shrink-0 items-center justify-between gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-md bg-[#0079c1]/10 text-[#005e95] transition-colors group-hover:bg-[#0079c1] group-hover:text-white">
          <Icon className="h-6 w-6" aria-hidden />
        </span>
        <RiArrowRightLine className={`${arrowClass} hidden sm:block`} aria-hidden />
      </span>
      <span className="min-w-0 flex-1 sm:mt-5 sm:flex-none">
        <span className="block text-[17px] font-semibold leading-snug text-slate-900 group-hover:text-[#005e95] sm:text-[19px]">{label}</span>
        {line && <span className="mt-1 block text-[15px] leading-snug text-slate-700 sm:mt-2 sm:leading-relaxed">{line}</span>}
      </span>
      <RiArrowRightLine className={`${arrowClass} sm:hidden`} aria-hidden />
    </Link>
  );
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const locale = params.locale;
  const lang = locale?.toLowerCase().startsWith("fr") ? "fr" : "en";
  const t = (await import(`@/messages/${lang}/industries/index.json`)).default as {
    hero: { kicker: string; title: string; subtitle: string; text: string; contact: string; anchor: string; bgImage: string };
    jump: string;
    sectors: Section;
    needs: Section;
    solutions: Section;
  };
  const home = (await import(`@/messages/${lang}/home.json`)).default;
  const labels = home.nav.links as Record<string, string>;

  // One line per card, read from the page it leads to, so the texts stay in one place.
  const clean = (s: unknown) => (typeof s === "string" ? s.trim().replace(/\.$/, "") : undefined);
  const sectorLines = await Promise.all(
    SECTORS.map(async (s) => clean((await import(`@/messages/${lang}/industries/${s.slug}/overview.json`)).default?.strengthen?.title))
  );
  const needLines = await Promise.all(
    NEEDS.map(async (n) => clean((await import(`@/messages/${lang}/industries/needs/${n.slug}.json`)).default?.hero?.subtitle1))
  );

  const groups = [
    { id: "secteurs", label: t.sectors.kicker, count: SECTORS.length },
    { id: "besoins", label: t.needs.kicker, count: NEEDS.length },
    { id: "solutions", label: t.solutions.kicker, count: SOLUTIONS.length },
  ];
  const grid = "mt-10 grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4";

  return (
    <>
      <ProductHero
        dark
        kicker={t.hero.kicker}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        text={t.hero.text}
        bgImage={t.hero.bgImage}
        contactLabel={t.hero.contact}
        anchorLabel={t.hero.anchor}
        anchor="secteurs"
        locale={locale}
      />

      {/* Shortcuts to the three groups */}
      <nav aria-label={t.jump} className="border-b border-slate-200 bg-white">
        <ul className={`${container} flex flex-wrap gap-x-8 gap-y-1 py-3`}>
          {groups.map((g) => (
            <li key={g.id}>
              <a
                href={`#${g.id}`}
                className={`inline-flex items-baseline gap-2 py-2 text-[15px] font-semibold text-slate-800 underline-offset-8 hover:text-[#005e95] hover:underline ${focusRing}`}
              >
                {g.label}
                <span className="text-[14px] font-medium tabular-nums text-slate-500">{g.count}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="secteurs" className="scroll-mt-16 bg-white">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={t.sectors.kicker} title={t.sectors.title} text={t.sectors.text.replace("{count}", String(SECTORS.length))} />
          <ul className={grid}>
            {SECTORS.map((s, i) => (
              <li key={s.key}>
                <Card entry={s} label={labels[s.key]} line={sectorLines[i]} locale={locale} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="besoins" className="scroll-mt-16 border-t border-slate-200 bg-slate-50">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead kicker={t.needs.kicker} title={t.needs.title} text={t.needs.text} />
          <ul className={grid}>
            {NEEDS.map((n, i) => (
              <li key={n.key}>
                <Card entry={n} label={labels[n.key]} line={needLines[i]} locale={locale} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="solutions" className="scroll-mt-16 bg-[#07131f] text-white">
        <div className={`${container} py-16 lg:py-24`}>
          <SectionHead dark kicker={t.solutions.kicker} title={t.solutions.title} text={t.solutions.text} />
          <ul className={grid}>
            {SOLUTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.key}>
                  <Link
                    href={`/${locale}${s.href}`}
                    className="group flex h-full items-center gap-4 rounded-lg border border-white/10 bg-[#0b1d2e] p-5 transition-colors duration-200 hover:border-sky-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07131f]"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-sky-400/15 text-sky-300">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="flex-1 text-[17px] font-semibold leading-snug">{labels[s.key]}</span>
                    <RiArrowRightLine className="h-5 w-5 shrink-0 text-sky-300 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <ContactCta data={home.home.contactCta} locale={locale} />
    </>
  );
}
