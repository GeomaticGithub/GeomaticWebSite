// The customer stories shown in the news section: the ones Esri published and that the sector pages already carry
// (one per sector at most). Server only — it goes through the reader of the sector pages.
import { SECTORS } from "@/app/[locale]/industries/catalog";
import { loadSector } from "@/app/[locale]/industries/_shared/sector";

export type NewsStory = {
  /** name of the label of the sector in nav.links, and the address of its page */
  sectorKey: string;
  sectorHref: string;
  title: string;
  text?: string;
  image?: string;
  videoUrl?: string;
  docUrl?: string;
};

export async function loadStories(lang: "fr" | "en"): Promise<NewsStory[]> {
  const all = await Promise.all(
    SECTORS.map(async (s): Promise<NewsStory | undefined> => {
      const sector = await loadSector(s.slug, lang);
      const story = sector.story;
      if (!story) return undefined;
      return {
        sectorKey: s.key,
        sectorHref: s.href,
        title: story.title,
        // a story without its own text or picture borrows the ones of its sector
        text: story.text ?? sector.subtitle,
        image: story.image ?? sector.bg,
        videoUrl: story.videoUrl,
        docUrl: story.docUrl,
      };
    })
  );
  return all.filter((s): s is NewsStory => Boolean(s));
}
