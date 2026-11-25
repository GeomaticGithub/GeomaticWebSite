export type InsightsMessages = {
  hero: {
    title: string;
    subtitle: string;
    image: string;
    ctaPrimary?: { label: string; href: string };
    icon: string;
  };
  intro: { paragraph: string };
  capabilities: {
    title: string;
    desc?: string;
    tabs: Array<{ image: string; title: string; label?: string }>;
    blocks: Array<{
      side: string; // e.g., "image-left" or "image-right"
      title: string;
      desc: string;
      image: string;
      ctaLabel?: string;
    }>;
  };
  how: {
    heading: string;
    steps: Array<{ title: string; desc: string; icon: string }>;
  };
  case: {
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
  deploy: {
    heading: string;
    desc: string;
    options: Array<{
      title: string;
      desc: string;
      cta: { label: string; href: string };
    }>;
    backdropImage: string;
  };
  getStarted: {
    leftImage: string;
    leftTitle: string;
    leftDesc: string;
    leftLink: string;
    leftCta: string;
    rightImage: string;
    rightTitle: string;
    rightDesc: string;
    rightLink: string;
    rightCta: string;
  };
};
