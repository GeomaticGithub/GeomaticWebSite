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
      image: string;   // partner logo or visual
      gradient: string; // (not used visually here but kept for parity)
      link: string;    // external partner page
      cta: string;     // e.g., "Learn more"
    }>;
  };
};
