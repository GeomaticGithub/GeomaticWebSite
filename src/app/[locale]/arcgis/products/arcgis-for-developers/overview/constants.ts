export type DevOverviewMessages = {
  hero: {
    eyebrow?: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
    rightImage: string; // laptop/hero compo
    ctaLink: string;
    bgGraphic: string; // blue band / graphic bg
  };
  iconStrip: Array<{ icon: string; title: string; caption: string }>;
  visualText: {
    visualImage: string; // the green mountain video still
    title: string;
    paragraph: string;
    bgGraphic: string; // decorative background image
  };
  capabilities: {
    heading: string;
    tabs: string[]; // labels only (static)
    blocks: Array<{
      side: string; // e.g., "image-left" or "image-right"
      title: string;
      desc: string;
      bullets?: string[];
      image: string;
      footnote?: string;
      ctaLabel?: string;
    }>;
    sections: Array<{
      side: string; // e.g., "image-left" or "image-right"
      title: string;
      desc: string;
      bullets?: string[];
      image: string;
      footnote?: string;
      ctaLabel?: string;
    }>;
  };
  resources: {
    heading: string;
    tiles: Array<{
      title: string;
      desc: string;
      icon: string;
      href: string;
    }>;
  };
  purpleCta: {
    title: string;
    desc: string;
    ctaLabel: string;
    href: string;
  };
};
