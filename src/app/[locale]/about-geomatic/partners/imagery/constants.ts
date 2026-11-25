export type AssetPageT = {
  hero: {
    title: string;
    description?: string;
    image?: string;
    bgGraphic: string;
  };
  intro: {
    title: string;
    subTitle: string;
    bgGraphic: string;
    paragraph: string;
  };
  community: {
    title: string;
    cards: Array<{
      title: string;
      desc: string;
      image: string;    // partner logo/visual
      gradient: string; // kept for parity (not required visually)
      link: string;     // external URL
      cta: string;      // e.g., "Learn more"
    }>;
  };
};
