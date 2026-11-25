export type IndoorsMessages = {
  hero: {
    title: string;
    subtitle: string;
    image: string;
    icon?: string;
    ctaText: string;
    ctaLink: string;
    bgGraphic: string;
  };
  intro: { paragraph: string };
  workplace: {
    heading: string;
    subheading?: string;
    image: string;
    pillars: Array<{ title: string; desc: string }>;
  };
  how: {
    steps: Array<{ title: string; desc: string }>;
    illustration: string;
    illustrationAlt: string;
  };
  build: { heading: string; desc: string; image: string; items: string[] };
  ips: {
    heading: string;
    desc1: string;
    desc2: string;
    leftImage: string;
    rightImage: string;
    learnMore: { label: string; href: string };
  };
  docs: {
    heading: string;
    desc: string;
    cards: Array<{ title: string; linkLabel: string; link: string }>;
  };
  community: {
    leftImage: string;
    leftTitle: string;
    leftDesc: string;
    leftLink: string;
    leftCta: string;
    centerImage: string;
    centerTitle: string;
    centerDesc: string;
    centerLink: string;
    centerCta: string;
    rightImage: string;
    rightTitle: string;
    rightDesc: string;
    rightLink: string;
    rightCta: string;
  };
  contact: {
    heading: string;
    desc: string;
    formImage?: string;
    link: string;
    linkText: string;
  };
};
