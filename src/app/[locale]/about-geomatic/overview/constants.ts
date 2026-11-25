export type AboutPageT = {
  hero: {
    kicker: string;
    title: string;
    description?: string;
    bgGraphic: string;
    ctaLabel?: string;
    /** YouTube embed URL, played in the video dialog. */
    ctaHref?: string;
  };
  stats: { value: string; label: string }[];
  story: {
    kicker: string;
    title: string;
    lead: string;
    paragraphs: string[];
    partnersLabel: string;
    partners: string[];
  };
  expertise: {
    kicker: string;
    title: string;
    items: { icon: string; title: string; desc: string }[];
  };
  values: {
    kicker: string;
    title: string;
    cards: { label: string; text: string }[];
  };
};

export const kickerClass =
  "flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em]";
