export type AssetPageT = {
  hero: {
    title: string;
    description?: string;
    image?: string;
    bgGraphic: string;
  };
  intro: {
    title: string;
    subTitle?: string;
    bgGraphic?: string;
    paragraph: string;
  };
  community: {
    title: string;
    cards: Array<{
      title: string;      // e.g., "Sabah Al-Salem University City - Kuwait University"
      desc?: string;      // short subtitle under the title
      image: string;      // customer logo / photo
      gradient?: string;  // optional, unused here
      link: string;       // PDF or detail page
      cta?: string;       // e.g., "Success Story Document"
    }>;
  };
};
