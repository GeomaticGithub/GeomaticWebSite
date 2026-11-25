// Reads the content file of a sector page and turns it into the blocks of the common layout.
// The eleven files were copied from the petroleum page, so each sector says here which of its blocks are its own;
// the others (petroleum segments on the banking page, events of 2018…) are left out.
// Server only: it checks on disk that the pictures exist, so a missing file is never requested.
import fs from "node:fs";
import path from "node:path";

const I = "/Solutions/Industries";

type Settings = {
  /** wide picture behind the banner */
  bg: string;
  /** blocks of the content file that hold the sub-sectors (none by default) */
  segments?: string[];
  /** false when the "features" of the file are not about this sector */
  features?: boolean;
  /** the customer story of the file (its "hero") is shown */
  story?: boolean;
  /** the banner texts come from the "hero" block instead of "strengthen" */
  ownHero?: boolean;
  resources?: boolean;
  /** the links of the feature rows are shown */
  featureLinks?: boolean;
};

export const SECTOR_SETTINGS: Record<string, Settings> = {
  municipalities: { bg: `${I}/municipalities/background-rapid-data-collection.jpg` },
  "electric-gas-utilities": { bg: `${I}/electricGasUtilities/Background_Awareness.jpg`, segments: ["empower"] },
  petroleum: { bg: `${I}/Petroleum/background-maps-everywhere.jpg`, segments: ["empower"], story: true },
  telecommunications: {
    bg: `${I}/telecommunications/background-monetize.jpg`,
    segments: ["empower"],
    story: true,
    resources: true,
    featureLinks: true,
  },
  transportation: { bg: `${I}/transportation/background-create-seemless-workflows-wide.jpg`, segments: ["empower"] },
  banking: { bg: `${I}/banking/discover-new-markets-and-opportunities-background-wide.jpg`, story: true },
  insurance: { bg: `${I}/banking/ensure-customer-remaind-key-background-wide.jpg`, features: false, segments: ["empower"], story: true },
  health: { bg: `${I}/health/maps-available-everywhere-wide.jpg`, segments: ["empower"], story: true },
  education: { bg: `${I}/education/overview-main-banner-wide.jpg`, features: false, segments: ["empower"], story: true, ownHero: true },
  retail: { bg: `${I}/retail/background-understand-purchases.jpg`, segments: ["empower1", "empower2"], story: true },
  "natural-resources": { bg: `${I}/naturalResources/access-world-of-content-background-wide.jpg`, segments: ["empower"], story: true },
};

export type SectorFeature = { title: string; text: string; image?: string; bg?: string; href?: string; linkLabel?: string };
export type SectorSegment = { title: string; text?: string; icon?: string; href?: string; linkLabel?: string };
export type SectorSegmentGroup = { title?: string; text?: string; items: SectorSegment[] };
export type SectorStory = { title: string; text?: string; image?: string; videoUrl?: string; docUrl?: string };
export type SectorResource = { title: string; text?: string; image?: string; href?: string };

export type SectorContent = {
  bg?: string;
  subtitle?: string;
  text?: string;
  features: SectorFeature[];
  segments: SectorSegmentGroup[];
  story?: SectorStory;
  resources?: { title?: string; text?: string; items: SectorResource[] };
};

/* ---- shape of the content files (every block is optional) ---- */
type Cta = { label?: string; href?: string };
type RawFeature = { title: string; paragraph: string; image?: string; backgroundImage?: string; cta?: Cta };
type RawEmpower = { title?: string; paragraph?: string; items?: { title: string; paragraph?: string; icon?: string; cta?: Cta }[] };
type RawSector = {
  hero?: { title?: string; kicker?: string; mediaImage?: string; backgroundImage?: string; videoUrl?: string; documentUrl?: string };
  strengthen?: { title?: string; paragraph?: string; imageSection?: { image?: string; title?: string; description?: string } };
  features?: RawFeature[];
  resources?: { title?: string; description?: string; cards?: { title: string; blurb?: string; image?: string; href?: string }[] };
} & Record<string, unknown>;

/** The picture, when the file is really in /public. */
export function picture(p?: string): string | undefined {
  if (!p || !p.startsWith("/")) return undefined;
  return fs.existsSync(path.join(process.cwd(), "public", decodeURIComponent(p))) ? p : undefined;
}

/**
 * A link to another site, without the tracking part of the address.
 * Links to pages of this site are dropped: the pages they name (…/segments/…) were never created.
 */
export function external(href?: string): string | undefined {
  if (!href || !/^https?:\/\//.test(href)) return undefined;
  try {
    const url = new URL(href);
    Array.from(url.searchParams.keys())
      .filter((k) => /^(rsource|rmedium|adu\w*|utm_\w+|sf_id)$/i.test(k))
      .forEach((k) => url.searchParams.delete(k));
    return url.toString();
  } catch {
    return undefined;
  }
}

export async function loadSector(slug: string, lang: "fr" | "en"): Promise<SectorContent> {
  const set = SECTOR_SETTINGS[slug];
  const raw = (await import(`@/messages/${lang}/industries/${slug}/overview.json`)).default as RawSector;
  const s = raw.strengthen;

  const features: SectorFeature[] = [];
  if (set.features !== false) {
    if (s?.imageSection?.title && s.imageSection.description) {
      features.push({ title: s.imageSection.title, text: s.imageSection.description, image: picture(s.imageSection.image) });
    }
    for (const f of raw.features ?? []) {
      const href = set.featureLinks ? external(f.cta?.href) : undefined;
      features.push({
        title: f.title,
        text: f.paragraph,
        image: picture(f.image),
        bg: picture(f.backgroundImage),
        // ArcGIS Cascade stories were retired: their links are not shown
        href: href && !href.includes("/apps/Cascade") ? href : undefined,
        linkLabel: f.cta?.label,
      });
    }
  }

  const segments: SectorSegmentGroup[] = (set.segments ?? []).flatMap((key) => {
    const block = raw[key] as RawEmpower | undefined;
    if (!block?.items?.length) return [];
    return [
      {
        title: block.title,
        text: block.paragraph,
        items: block.items.map((it) => ({
          title: it.title,
          text: it.paragraph,
          icon: picture(it.icon),
          href: external(it.cta?.href),
          linkLabel: it.cta?.label,
        })),
      },
    ];
  });

  const h = raw.hero;
  const story: SectorStory | undefined =
    set.story && h?.title
      ? {
          title: h.title,
          text: set.ownHero ? undefined : h.kicker,
          image: picture(h.mediaImage ?? h.backgroundImage),
          videoUrl: external(h.videoUrl),
          docUrl: external(h.documentUrl),
        }
      : undefined;

  const res = set.resources ? raw.resources : undefined;

  return {
    bg: picture(set.bg),
    subtitle: set.ownHero ? h?.kicker : s?.title,
    text: set.ownHero ? undefined : s?.paragraph,
    features,
    segments,
    story,
    resources: res?.cards?.length
      ? {
          title: res.title,
          text: res.description,
          items: res.cards.map((c) => ({ title: c.title, text: c.blurb, image: picture(c.image), href: external(c.href) })),
        }
      : undefined,
  };
}
