export type StoriesSection = {
  title: string;
  description: string;
  items: Array<{
    id: number;
    title: string;
    description: string;
    mainImage: string;
    avatarImage: string;
    linkText: string;
    href: string;
  }>;
};

export type ProOverviewMessages = {
  hero: {
    title: string;
    subtitle: string;
    bgImage: string; // dark hero background/texture
    mediaImage: string; // product montage on the right
    mediaAlt: string;
    logoImage: string; // small product logo at top left
  };
  intro: {
    paragraph: string;
  };
  stories: StoriesSection;
  howItWorks: {
    illustration: string;
    illustrationAlt: string;
    steps: Array<{ title: string; desc: string }>;
  };
  success: {
    background: string;
    headTitle: string;
    title: string;
    desc: string;
    ctaText: string;
    ctaHref: string;
    pills: Array<{
      label: string;
      image?: string;
      backgroundImage?: string;
      title?: string;
      desc?: string;
      actionType?: string; // e.g., "story" or "video"
      actionText?: string;
      actionUrl?: string;
    }>;
  };
  ecosystem: {
    title: string;
    desc: string;
    items: Array<{
      title: string;
      desc: string;
      hrefLabel: string;
      href: string;
    }>;
    crossImage: string; // decorative image between tiles
  };
  extensions: {
    title: string;
    categories: Array<{
      label: string;
      cards: Array<{
        title: string;
        desc: string;
        image: string;
        imageAlt: string;
        actionUrl: string;
      }>;
    }>;
  };
};
