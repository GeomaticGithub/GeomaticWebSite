export type BAOverviewMessages = {
  hero: {
    title: string;
    subtitle: string;
    rightImage: string;
    bgGraphic: string;
  };
  intro: { paragraph: string };
  benefits: {
    title: string;
    tabs: Array<{ image: string; title: string }>;
    blocks: Array<{
      side: string; // e.g., "image-left" or "image-right"
      title: string;
      desc: string;
      image: string;
      ctaLabel?: string;
    }>;
    feature: {
      image: string;
      title: string;
      desc: string;
    };
  };
  how: {
    title: string;
    steps: Array<{ image: string; title: string; desc: string }>;
  };
  caseStudy: {
    background: string;
    headTitle: string;
    title: string;
    desc: string;
    pills: Array<{
      label: string;
      image: string;
      title: string;
      desc: string;
      attribution?: string;
      actionType?: string; // e.g., "story" or "video"
      actionText?: string;
      actionUrl?: string;
    }>;
  };
  integration: {
    title: string;
    desc: string;
    ctaLabel: string;
    image: string;
    ctaUrl: string;
  };
};
