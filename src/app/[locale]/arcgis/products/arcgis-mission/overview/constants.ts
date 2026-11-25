export type MissionMessages = {
  hero: {
    title: string;
    subtitle: string;
    image: string;
    ctaLink: string;
    ctaText: string;
    bgGraphic: string;
  };
  intro: { paragraph: string };
  benefits: {
    heading: string;
    image: string;
    desc: string;
    items: Array<{ title: string; desc: string; icon?: string }>;
  };
  how: {
    steps: Array<{ title: string; desc: string }>;
    illustration: string;
    illustrationAlt: string;
  };
  platform: {
    heading: string;
    desc: string;
    tiles: Array<{
      title: string;
      image: string;
      titleAlt: string;
      descAlt: string;
    }>;
  };
  cta: {
    heading: string;
    desc: string;
    image: string;
    button?: { label: string; href: string };
  };
};
