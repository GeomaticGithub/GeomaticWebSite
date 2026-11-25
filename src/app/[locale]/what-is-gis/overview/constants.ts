export type WhatIsGisMessages = {
  hero: {
    title: string;
    subtitle: string;
    image: string;
  };
  intro: { paragraph: string };

  split: {
    imageLeft: string;
    title: string;
    description: string;
    items: Array<{
      label: string;
      avatarImage: string;
      mainImage: string;
      description: string;
      href: string;
      linkText: string;
    }>;
    callout?: { title: string; text: string; href: string; linkText: string };
  };

  works: {
    title: string;
    intro: string;
    cards: Array<{
      title: string;
      body: string;
      ctaText: string;
      href: string;
      image: string;
    }>;
  };

  bottomCtas: {
    items: Array<{
      title: string;
      body: string;
      href: string;
      linkText: string;
      icon: string;
    }>;
  };
};
