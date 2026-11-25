import { IconBase } from "react-icons";

export type HubOverviewMessages = {
  hero: {
    title: string;
    subtitle: string;
    image: string;
    bgGraphic: string;
    icon: string;
  };
  intro: { paragraph: string };
  icons: { title: string; items: Array<{ label: string; icon?: string }> };
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
  };
  openData: {
    image: string;
    title: string;
    desc: string;
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
  sites: {
    title: string;
    desc: string;
    cards: Array<{ image: string; title: string; desc: string; link: string }>;
  };
  testimonial: {
    quote: string;
    author: string;
    role: string;
    background: string;
    avatar: string;
  };
  capabilities: {
    title: string;
    desc: string;
    icon?: string;
    groups: Array<{
      title: string;
      items: string[];
      icon: string;
      desc: string;
    }>;
  };
  tripleCta: {
    tiles: Array<{ title: string; desc: string; cta: string }>;
  };
  bottomInfo: {
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
};
