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
      title: string;
      desc?: string;
      image: string;
      gradient?: string;
      link: string;
      cta?: string;
    }>;
  };
};
