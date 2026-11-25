export type SharePointMessages = {
  hero: {
    title: string;
    subtitle: string;
    image: string;
    cta?: { label: string; href: string };
    icon: string;
  };
  intro: { paragraph: string };
  featureLead: { title: string; desc: string; image: string };
  featuresGrid: {
    items: Array<{
      title: string;
      desc: string;
      image: string;
      colorBg: string;
    }>;
  };
  features: {
    eyebrow?: string;
    title: string;
    items: Array<{
      title: string;
      desc: string;
      image: string;
      cta: { label: string; href: string };
    }>;
  };
  msGrid: {
    heading: string;
    desc: string;
    tiles: Array<{
      title: string;
      titleAlt: string;
      descAlt: string;
      image: string;
      cta: {
        label: string;
        href: string;
      };
    }>;
  };
};
