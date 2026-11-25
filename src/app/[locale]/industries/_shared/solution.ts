// Reads the content file of a partner-solution page (industries/solutions/<slug>.json).
// The seven files have the same shape; every block except the banner is optional.
// Server only (it checks on disk that the pictures exist, so a missing file is never requested).
import { external, picture } from "./sector";

/** "contain" for screenshots, slides and logos (shown whole on white); photos fill their frame. */
type Fit = "cover" | "contain";

export type SolutionContent = {
  hero: { title: string; subtitle?: string; text?: string; bg?: string };
  /** a paragraph that follows the banner */
  lead?: string;
  sections: { title: string; paragraphs: string[]; bullets: string[]; image?: string; fit: Fit }[];
  steps?: { title: string; items: { title: string; points: string[] }[] };
  video?: { title: string; text?: string; src: string };
  /** presentation of the partner product; `href` is the brochure, when there is one */
  brochure?: { title: string; text: string; image?: string; fit: Fit; href?: string };
  /** slides and screenshots, with their text */
  examples: { title: string; text?: string; image: string }[];
};

type Raw = {
  hero: { title: string; subtitle?: string; text?: string; bgImage?: string };
  lead?: string;
  sections?: { title: string; paragraphs?: string[]; bullets?: string[]; image?: string; fit?: Fit }[];
  steps?: { title: string; items: { title: string; points: string[] }[] };
  video?: { title: string; text?: string; youtubeId?: string };
  brochure?: { title: string; text: string; image?: string; fit?: Fit; href?: string };
  examples?: { title: string; text?: string; image?: string }[];
};

export async function loadSolution(slug: string, lang: "fr" | "en"): Promise<SolutionContent> {
  const raw = (await import(`@/messages/${lang}/industries/solutions/${slug}.json`)).default as Raw;
  const id = raw.video?.youtubeId;

  return {
    hero: { title: raw.hero.title, subtitle: raw.hero.subtitle, text: raw.hero.text, bg: picture(raw.hero.bgImage) },
    lead: raw.lead,
    sections: (raw.sections ?? []).map((s) => ({
      title: s.title,
      paragraphs: s.paragraphs ?? [],
      bullets: s.bullets ?? [],
      image: picture(s.image),
      fit: s.fit ?? "cover",
    })),
    steps: raw.steps?.items?.length ? raw.steps : undefined,
    // the player without YouTube's cookies
    video: raw.video && id && /^[\w-]{6,}$/.test(id) ? { title: raw.video.title, text: raw.video.text, src: `https://www.youtube-nocookie.com/embed/${id}` } : undefined,
    brochure: raw.brochure
      ? { title: raw.brochure.title, text: raw.brochure.text, image: picture(raw.brochure.image), fit: raw.brochure.fit ?? "cover", href: external(raw.brochure.href) }
      : undefined,
    examples: (raw.examples ?? []).flatMap((e) => {
      const image = picture(e.image);
      return image ? [{ title: e.title, text: e.text, image }] : [];
    }),
  };
}
