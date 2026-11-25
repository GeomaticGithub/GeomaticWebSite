export type UrbanOverviewMessages = {
  hero: {
    eyebrow?: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaLink: string;
    rightImage: string;
    bgGraphic: string;
  };
  intro: { paragraph: string };
  centerVisual: {
    title: string;
    desc: string;
    image: string;
    ctaLabel: string;
    ctaLink: string;
  };
  darkStrip: Array<{
    image: string;
    title: string;
    desc: string;
  }>;
  split: {
    leftImage: string;
    leftImageAlt: string;
    features: Array<{ icon: string; title: string; desc: string }>;
  };
  caseStudy: {
    background: string;
    headTitle: string;
    title: string;
    desc: string;
    pills: Array<{
      label: string;
      image?: string;
      title?: string;
      desc?: string;
      attribution?: string;
      actionType?: string; // e.g., "story" or "video"
      actionText?: string;
      actionUrl?: string;
    }>;
  };
  quickTiles: {
    title: string;
    items: Array<{ title: string; desc: string; link: string }>;
  };
  bottomInfo: {
    leftImage: string;
    leftTitle: string;
    leftDesc: string;
    leftLink: string;
    rightImage: string;
    rightTitle: string;
    rightDesc: string;
    rightLink: string;
  };
};
