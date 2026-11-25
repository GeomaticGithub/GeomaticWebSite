export type AssetPageT = {
  hero: {
    title: string;
    subTitle?: string;
    image?: string;
    bgGraphic: string;
  };
  intro: {
    paragraph1: string;
    paragraph2: string;
  };
  performanceList: Array<{
    eyebrow?: string;
    title: string;
    intro1: string;
    intro2: string;
    image: string;
    documentUrl?: string;
  }>;
  performanceVGIS: {
    eyebrow: string;
    title: string;
    intro: string;
    image: string;
    documentUrl: string;
  };
  dualImages: {
    image1: string;
    image2: string;
    alt1?: string;
    alt2?: string;
  };
  capabilities?: {
    title: string;
    blurb: string;
    items: Array<{
      image: string;
      title: string;
      body: string;
      href: string;
      cta: string;
    }>;
  };
  enhance?: {
    title: string;
    body: string;
    image?: string;
  };
  solution?: {
    eyebrow?: string;
    title: string;
    intro: string;
    image: string;
    alt?: string;
    youtubeUrl?: string;
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
