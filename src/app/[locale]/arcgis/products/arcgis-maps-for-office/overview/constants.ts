export type OfficeMessages = {
  hero: {
    title: string;
    subtitle: string;
    image: string;
    icon: string;
    bgGraphic: string;
    cta?: {
      label: string;
      href: string;
    };
  };
  intro: { paragraph: string };
  addIntelligence: { title: string; image: string; desc: string };
  features: {
    items: Array<{
      title: string;
      desc: string;
      image: string;
      colorBg: string;
    }>;
  };
  how: { title: string; steps: Array<{ title: string; desc: string }> };
  ms: {
    heading: string;
    desc: string;
    tiles: Array<{
      title: string;
      titleAlt: string;
      descAlt: string;
      image: string;
      cta?: {
        href: string;
        text?: string;
      };
    }>;
  };
};
