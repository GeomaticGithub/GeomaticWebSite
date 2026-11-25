export type HeroT = {
  eyebrow?: string;
  title: string;
  kicker?: string;
  backgroundImage?: string; // full-width background image
  videoUrl?: string; // YouTube video URL for popup
  ctaHref?: string; // Call to action link for video
};

export type StrengthenT = {
  title: string;
  paragraph: string;
  imageSection: {
    image: string;
    title: string;
    description: string;
  };
};

export type FeatureRowT = {
  title: string;
  paragraph: string;
  image: string;
  imageAlt?: string;
  backgroundImage?: string;
  layout: string; // "left" | "right" - relaxed to handle JSON
};

export type EmpowerItemT = {
  title: string;
  paragraph: string;
  icon?: string;
  cta?: {
    label: string;
    href: string;
    icon?: string;
  };
};

export type NewsCardT = {
  eyebrow: string; // e.g. EVENT / NEWS / CASE STUDY
  title: string;
  blurb: string;
  image?: string;
  meta?: string; // e.g. dates/place
  href: string;
};

export type CtaT = {
  title: string;
  ctaLabel: string;
  ctaHref: string;
};

export type PetroleumOverviewT = {
  hero: HeroT;
  strengthen: StrengthenT;
  features: FeatureRowT[];
  empower: {
    title?: string;
    items: EmpowerItemT[]; // relaxed from tuple for JSON flexibility
  };
  news: {
    title: string;
    backgroundImage?: string;
    cards: NewsCardT[]; // relaxed from tuple for JSON flexibility
  };
  cta: CtaT;
};
