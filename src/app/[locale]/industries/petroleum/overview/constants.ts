export type HeroT = {
  eyebrow?: string;
  title: string;
  kicker?: string;
  mediaImage?: string; // thumbnail image URL
  videoUrl?: string; // direct iframe embed URL
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
  paragraph?: string;
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

export type DualPromoT = {
  SpacialAnalysisTitle: string;
  SpacialAnalysisDesc: string;
  SpacialAnalysisHref: string;
  SpacialAnalysisCta: string;
  blogTitle: string;
  blogDesc: string;
  blogHref: string;
  blogCta: string;
};

export type IntroT = {
  paragraph: string;
};

export type ProductsT = {
  title: string;
  online: { category: string; title: string; desc: string; img?: string };
  enterprise: { category: string; title: string; desc: string; img?: string };
  devtools: { category: string; title: string; desc: string; img?: string };
  pro: { category: string; title: string; desc: string; img?: string };
  online2: { category: string; title: string; desc: string; img?: string };
  enterprise2: { category: string; title: string; desc: string; img?: string };
  devtools2: { category: string; title: string; desc: string; img?: string };
  pro2: { category: string; title: string; desc: string; img?: string };
};

export type SectionsT = {
  map: { title: string; p1: string };
  interact: { title: string; p1: string };
  understand: { title: string; p1: string };
  enrich: { title: string; p1: string };
};

export type PetroleumOverviewT = {
  hero?: HeroT;
  strengthen?: StrengthenT;
  features?: FeatureRowT[];
  empower?: {
    title?: string;
    paragraph?: string;
    items: EmpowerItemT[];
  };
  news?: {
    title: string;
    backgroundImage?: string;
    cards: NewsCardT[];
  };
  cta?: CtaT;
};
