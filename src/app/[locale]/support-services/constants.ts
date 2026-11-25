/** Content of the services overview page (src/messages/{fr,en}/support-services/index.json). */
export type ServicesPageT = {
  ui: {
    kicker: string;
    contact: string;
    anchor: string;
    servicesKicker: string;
    servicesTitle: string;
    servicesText: string;
    needsKicker: string;
    needsTitle: string;
    needsText: string;
  };
  hero: { title: string; subtitle: string; text: string; image: string; bgGraphic: string };
  services: {
    key: "support" | "learning" | "consulting";
    title: string;
    desc: string;
    image: string;
    link: string;
    cta: string;
    /** "{count}" is replaced by the number of courses in the catalogue */
    points: string[];
  }[];
  needs: { need: string; answer: string; link: string }[];
};

/** Type of the former page layout, still used by the old components of this folder. */
export type AssetPageT = {
  hero: {
    title: string;
    image: string;
    bgGraphic: string;
  };
  intro?: {
    paragraph: string;
  };
  performanceList?: Array<{
    eyebrow?: string;
    title: string;
    intro: string[];
    image: string;
    documentUrl?: string;
  }>;
  performanceGDI?: {
    eyebrow: string;
    title: string;
    intro: string;
    image: string;
    documentUrl: string;
  };
  dualImages?: {
    image1: string;
    image2: string;
    alt1?: string;
    alt2?: string;
  };
  community: {
    leftTitle: string;
    leftDesc: string;
    leftImage: string;
    leftBgImage: string;
    leftLink: string;
    leftCta: string;
    centerTitle: string;
    centerDesc: string;
    centerImage: string;
    centerBgImage: string;
    centerLink: string;
    centerCta: string;
    rightTitle: string;
    rightDesc: string;
    rightImage: string;
    rightBgImage: string;
    rightLink: string;
    rightCta: string;
  };
};
