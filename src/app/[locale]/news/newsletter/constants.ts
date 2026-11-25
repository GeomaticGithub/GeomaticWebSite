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
      title: string;      // e.g., "Winter | 2023"
      desc?: string;      // e.g., "Winter | 2023" (badge text) or short note
      image: string;      // newsletter cover
      gradient?: string;  // optional, for badge tint; ex: "from-sky-600 to-slate-800"
      link: string;       // PDF or detail page
      cta?: string;       // e.g., "Open PDF"
    }>;
  };
};
