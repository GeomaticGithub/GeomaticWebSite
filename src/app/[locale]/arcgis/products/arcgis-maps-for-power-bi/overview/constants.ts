export type PowerBIMessages = {
  hero: {
    title: string;
    subtitle: string;
    image: string;
    cta?: { label: string; href: string };
  };
  intro: { paragraph: string };
  feature: {
    title: string;
    desc?: string;
    tabs: Array<{ title: string; icon: string }>;
    blocks: Array<{
      title: string;
      desc: string;
      image: string;
      side: string; // e.g., "image-left" or "image-right"
      ctaLabel?: string;
    }>;
  };
  how: {
    title: string;
    desc: string;
    steps: Array<{ title: string; desc: string }>;
  };
  caseStudy: {
    eyebrow: string;
    title: string;
    desc: string;
    cta: { label: string; href: string };
    image: string;
  };
  msGrid: {
    heading: string;
    desc: string;
    tiles: Array<{
      title: string;
      titleAlt: string;
      descAlt: string;
      image: string;
      imageAlt?: string;
      cta: { label: string; href: string };
    }>;
  };
};
