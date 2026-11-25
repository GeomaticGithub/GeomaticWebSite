export type LogisticsPageT = {
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
  band?: { title: string; body: string };
  routes: { title: string; intro: string; bullets: string[]; image?: string };
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
  related: {
    title: string;
    bgGraphic: string;
    items: Array<{ title: string; body: string; href: string; icon: string }>;
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
