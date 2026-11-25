export type ShareCollabMsgs = {
  hero: {
    title: string;
    subtitle: string;
    bgGraphic: string; // blue band / graphic bg
    mediaImage: string; // right hero photo/collage
    mediaAlt: string;
  };
  startConversation: {
    title: string;
    bullets: string[];
    ctaText: string;
    ctaHref: string;
    stackedImages: string[]; // 2–3 thumbnails stacked at left
  };
  chooseAudience: {
    title: string;
    bullets: string[];
    collageImages: string[]; // 2–3 images stacked at right
  };
  collaborate: {
    title: string;
    bullets: string[];
    ctaText: string;
    ctaHref: string;
    stackedImages: string[];
    bgGraphic?: string;
  };
  quote: {
    text: string;
    author: string;
    role: string;
    bgGraphic: string;
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
    subHeading: string;
    href: string;
    link: string;
  };
};
