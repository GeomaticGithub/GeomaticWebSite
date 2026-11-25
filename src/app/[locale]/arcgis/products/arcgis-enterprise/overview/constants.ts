export type EnterpriseOverviewMessages = {
  hero: {
    title: string;
    subtitle: string;
    bgImage: string; // purple banner background
    montageImage: string; // product montage on right
    montageAlt: string;
    logoImage: string;
  };
  intro: { paragraph: string };

  software: {
    heading: string; // “Map and analyze with the leading GIS software”
    subheading?: string;
    image: string; // hex/people image
    imageAlt: string;
  };

  capabilities: {
    items: Array<{
      icon?: string; // optional small svg path if you want
      title: string;
      desc: string;
      cta?: string;
      href?: string;
    }>;
  };

  howItWorks: {
    rows: Array<{ title: string; desc: string; href?: string }>; // Access / Analyze / Share
    graphic: string; // dark “How it works” graphic on right
    graphicAlt: string;
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

  foundation: {
    heading: string; // “Build your foundation with ArcGIS Enterprise”
    blurb: string;
    tiles: Array<{
      title: string;
      desc: string;
      hrefUrl: string;
      hrefText: string;
      bg: string; // background image/gradient for the tile,
      icon: string; // icon image for the tile
    }>;
  };
};
