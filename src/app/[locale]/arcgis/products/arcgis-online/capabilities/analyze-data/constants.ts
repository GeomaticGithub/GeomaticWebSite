export type AnalyzeMsgs = {
  hero: {
    title: string;
    subtitle: string;
    bgGraphic: string; // blue band background/graphic
    mediaImage: string; // hero right image
    mediaAlt: string;
  };
  understand: {
    title: string;
    desc?: string;
    bullets: string[];
    collageLeft: string; // background/table+scatter style image
    collageOverlay?: string;
    ctaText?: string;
    ctaHref?: string;
  };
  findLocation: {
    title: string;
    desc?: string;
    bullets: string[];
    photoRight: string;
    photoAlt: string;
    overlayMap: string;
  };
  routes: {
    title: string;
    desc?: string;
    bullets: string[];
    photoLeft: string;
    photoAlt: string;
    overlayRoute: string;
  };
  learnLocation: {
    title: string;
    desc?: string;
    bullets: string[];
    photoRight: string;
    photoAlt: string;
  };
  discover: {
    heading: string;
    cards: Array<{
      title: string;
      desc: string;
      linkText: string;
      href: string;
      bgImage: string;
      bgAlt: string;
    }>;
  };
  duoCta: {
    left: { title: string; button: string; href: string };
    right: { title: string; button: string; href: string };
  };
  help: {
    heading: string;
    subHeading?: string;
    link?: string;
    href?: string;
    items?: Array<{
      title: string;
      desc: string;
      action: string;
      href: string;
    }>;
    footerLinkText?: string;
    footerHref?: string;
  };
};
