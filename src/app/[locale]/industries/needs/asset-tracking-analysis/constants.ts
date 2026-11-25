export type AssetPageT = {
  hero: {
    title: string;
    subtitle1: string;
    subtitle2: string;
    image: string;
    bgGraphic: string;
  };
  intro: {
    paragraph: string;
    title: string;
  };
  enhance: {
    title: string;
    body: string;
    image?: string; // optional decorative image on the left in dark band
  };
  performance: {
    title: string;
    intro: string;
    bullets: string[];
    image?: string; // the greyscale city scene with callouts
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
