export type AOOverviewMessages = {
  ui: {
    kicker: string;
    contact: string;
    features: string;
    powerKicker: string;
    designedKicker: string;
    expandKicker: string;
    storiesKicker: string;
    storiesTitle: string;
    onEsri: string;
  };
  hero: {
    title: string;
    subtitle: string;
    bgImage: string; // light background pattern
    icon?: string; // product icon
    mediaImage: string; // right-side picture
    mediaAlt: string;
  };
  intro: { text: string };
  power: { title: string; image: string; imageAlt: string };
  features: {
    items: Array<{
      icon: string; // "map" | "share" | "analyze" | "data"
      title: string;
      desc: string;
      linkText: string;
      /** page of this site ("/…"), esri.com address, or "" when there is no page yet */
      href: string;
    }>;
  };
  designed: {
    title: string;
    tabs: Array<{ label: string; title: string; desc: string; image: string; imageAlt: string }>;
  };
  expand: {
    title: string;
    bgImage: string;
    desc?: string;
    cards: Array<{ title: string; desc: string; linkText: string; href: string; image: string; imageAlt: string }>;
  };
  success: {
    background: string;
    title: string;
    desc: string;
    ctaText: string;
    ctaHref: string;
    pills: Array<{
      label: string;
      image?: string;
      title?: string;
      desc?: string;
      actionType?: string;
      actionText?: string;
      actionUrl?: string;
    }>;
  };
};

export const kickerClass =
  "flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em]";
export const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1] focus-visible:ring-offset-2";
