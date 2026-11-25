// Reads the content file of a "business need" page and turns it into the blocks of the common layout.
// The eleven files have the same shape; only the name of the "benefits" block changes from one file to the next.
// Server only (it checks on disk that the pictures exist).
import { NEEDS } from "../catalog";
import { external, picture } from "./sector";

/** Names the "benefits" block (title, introduction, list, picture) has in the content files. */
const BENEFIT_KEYS = ["performance", "growth", "efficiencies", "connections", "routes", "opportunities"];

/** Esri capability pages that have their own page on this site. */
const LOCAL_CAPABILITIES: Record<string, string> = {
  "spatial-analytics-data-science": "/arcgis/products/spatial-analytics-data-science/overview",
  "field-operations": "/products/capabilities/field-operations",
  mapping: "/products/capabilities/mapping",
  "3d-gis": "/arcgis/3d-gis/overview",
};

export type NeedLink = { href: string; external: boolean };
export type NeedContent = {
  hero: { title: string; subtitle?: string; text?: string; image?: string; bg?: string };
  intro?: { title: string; text: string };
  benefits?: { title: string; text?: string; bullets: string[]; image?: string };
  capabilities?: { title: string; text?: string; items: { title: string; text: string; image?: string; label?: string; link?: NeedLink }[] };
  related?: { title: string; items: { title: string; text?: string; icon?: string; href?: string }[] };
  articles?: { title: string; items: { tag?: string; source?: string; title: string; text?: string; image?: string; href?: string }[] };
};

type Raw = {
  hero: { title: string; subtitle1?: string; subtitle2?: string; image?: string; bgGraphic?: string };
  intro?: { title: string; paragraph: string };
  capabilities?: { title: string; blurb?: string; items: { title: string; body: string; cta?: string; href?: string; image?: string }[] };
  related?: { title: string; items: { title: string; body?: string; href?: string; icon?: string }[] };
  articles?: { title: string; items: { tag?: string; title: string; source?: string; excerpt?: string; href?: string; image?: string }[] };
} & Record<string, unknown>;

/** The page of this site for an Esri capability, or the Esri page itself (without tracking parameters). */
function capabilityLink(href?: string): NeedLink | undefined {
  const url = external(href);
  if (!url) return undefined;
  const m = /^https?:\/\/www\.esri\.com\/en-us\/capabilities\/([a-z0-9-]+)/.exec(url);
  const local = m && LOCAL_CAPABILITIES[m[1]];
  return local ? { href: local, external: false } : { href: url, external: true };
}

/** A related need is linked only when its page exists on this site. */
function needHref(href?: string): string | undefined {
  if (!href) return undefined;
  const p = href.startsWith("/") ? href : `/${href}`;
  return NEEDS.some((n) => n.href === p) ? p : undefined;
}

export async function loadNeed(slug: string, lang: "fr" | "en"): Promise<NeedContent> {
  const raw = (await import(`@/messages/${lang}/industries/needs/${slug}.json`)).default as Raw;
  const b = BENEFIT_KEYS.map((k) => raw[k]).find(Boolean) as { title: string; intro?: string; bullets?: string[]; image?: string } | undefined;

  return {
    hero: {
      title: raw.hero.title,
      subtitle: raw.hero.subtitle1,
      text: raw.hero.subtitle2,
      image: picture(raw.hero.image),
      bg: picture(raw.hero.bgGraphic),
    },
    intro: raw.intro ? { title: raw.intro.title, text: raw.intro.paragraph } : undefined,
    benefits: b ? { title: b.title, text: b.intro, bullets: b.bullets ?? [], image: picture(b.image) } : undefined,
    capabilities: raw.capabilities?.items?.length
      ? {
          title: raw.capabilities.title,
          text: raw.capabilities.blurb,
          items: raw.capabilities.items.map((c) => ({
            title: c.title,
            text: c.body,
            image: picture(c.image),
            label: c.cta,
            link: capabilityLink(c.href),
          })),
        }
      : undefined,
    related: raw.related?.items?.length
      ? {
          title: raw.related.title,
          items: raw.related.items.map((r) => ({ title: r.title, text: r.body, icon: picture(r.icon), href: needHref(r.href) })),
        }
      : undefined,
    articles: raw.articles?.items?.length
      ? {
          title: raw.articles.title,
          items: raw.articles.items.map((a) => ({
            tag: a.tag,
            source: a.source,
            title: a.title,
            text: a.excerpt,
            image: picture(a.image),
            href: external(a.href),
          })),
        }
      : undefined,
  };
}
