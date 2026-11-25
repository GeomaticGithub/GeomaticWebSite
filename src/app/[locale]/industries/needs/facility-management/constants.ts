export type FacilityPageT = {
  hero: {
    title: string;
    subtitle1: string;
    subtitle2: string;
    image: string;
    bgGraphic: string;
  };
  intro: { title?: string; paragraph: string };
  control: { title: string; body: string; image?: string };
  efficiencies: {
    title: string;
    intro: string;
    bullets: string[];
    image?: string;
  };
  capabilities: {
    title: string;
    blurb: string;
    items: Array<{
      title: string;
      body: string;
      cta: string;
      href: string;
      image: string;
    }>;
  };
  articles: {
    title: string;
    items: Array<{
      tag: string;
      title: string;
      source: string;
      excerpt: string;
      href: string;
      image: string;
    }>;
  };
};
