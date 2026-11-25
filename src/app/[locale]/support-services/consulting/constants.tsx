export type ConsultingPageT = {
  hero: {
    title: string;
    subtitle?: string;
    image?: string;
    bgGraphic: string;
  };
  features: {
    items: Array<{
      title: string;
      desc: string;
      icon?: string; // optional svg path if you want
    }>;
  };
  engagement: {
    title: string;
    blurb?: string;
  };
  projects: {
    title: string;
    paragraphs: string[];
    illustration?: string;
  };
  services: {
    title: string;
    description: string;
    cards: Array<{
      title: string;
      desc: string;
      icon?: string;
    }>;
  };
};
