export type PartnersPageT = {
  hero: {
    kicker: string;
    title: string;
    lead: string;
    description: string;
    bgGraphic: string;
  };
  ui: {
    all: string;
    site: string;
    count: string;
    countOne: string;
    /** used by the three family pages */
    kicker: string;
    solution: string;
    others: string;
    allPartners: string;
  };
  categories: { key: string; title: string; link: string }[];
};

export type PartnerT = {
  title: string;
  desc?: string;
  image: string;
  /** the partner's own site */
  link?: string;
  /** the page of this site that presents the partner's solution */
  solution?: string;
};

/** Shape shared by the three partner family pages (technology, solutions, imagery). */
export type PartnerListT = {
  hero: { title: string; bgGraphic: string };
  intro: { subTitle?: string; paragraph?: string };
  community: { cards: PartnerT[] };
};
