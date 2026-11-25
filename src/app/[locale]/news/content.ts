// What the four pages of the news section share: the language, the menu labels, the three cards and the customer stories.
import type { NewsCard } from "./_components/NewsCards";
import { loadStories } from "./stories";

export type NewsHero = { kicker?: string; title: string; subtitle?: string; text?: string; bgImage?: string; contact?: string; anchor?: string };
export type Ui = Record<string, string>;

export async function newsContext(locale: string) {
  const lang: "fr" | "en" = locale?.toLowerCase().startsWith("fr") ? "fr" : "en";
  const home = (await import(`@/messages/${lang}/home.json`)).default;
  const index = (await import(`@/messages/${lang}/news/index.json`)).default as unknown as {
    hero: NewsHero;
    list: { kicker: string; title: string };
    cards: NewsCard[];
  };
  return {
    lang,
    index,
    /** menu labels: names of the publications and of the sectors */
    labels: home.nav.links as Record<string, string>,
    cta: home.home.contactCta,
    stories: await loadStories(lang),
  };
}
