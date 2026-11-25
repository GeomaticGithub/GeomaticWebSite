export type AssetPageT = {
  hero: {
    title: string;
    subTitle?: string;
    image?: string;
    bgGraphic: string;
  };
  intro: {
    paragraph: string;
  };
  performanceList: Array<{
    eyebrow?: string;
    title: string;
    intro: string[] | string;
    image: string;
    documentUrl?: string;
  }>;
  solution?: {
    eyebrow?: string;
    title: string;
    intro: string;
    image: string;
    alt?: string;
    youtubeUrl?: string;
  };
  capabilities?: {
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
  enhance?: {
    title: string;
    body: string;
    image?: string;
  };
  articles?: {
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
