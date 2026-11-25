/** Themes of the catalogue, in display order. Their names are in the content file (ui.categories). */
export const COURSE_THEMES = ["basics", "mapping", "analysis", "sharing", "data", "enterprise", "dev", "industry"] as const;
export type CourseTheme = (typeof COURSE_THEMES)[number];

export type Course = {
  title: string;
  category: CourseTheme;
  /** address of the course sheet; these pages do not exist yet, so the catalogue shows the title without a link */
  link: string;
};

export type CatalogueUi = {
  kicker: string;
  heroText: string;
  contact: string;
  anchor: string;
  catalogKicker: string;
  filterLabel: string;
  filterPlaceholder: string;
  clear: string;
  themes: string;
  all: string;
  count: string;
  countOne: string;
  noResult: string;
  reset: string;
  planKicker: string;
  categories: Record<CourseTheme, string>;
};

/** Content of the catalogue page (src/messages/{fr,en}/support-services/learning/courses/index.json). */
export type CoursesPageT = {
  ui: CatalogueUi;
  hero: { title: string; description?: string; bgGraphic: string };
  intro: {
    title: string;
    subTitle: string;
    bgGraphic: string;
    paragraph: string;
    emailText: string;
    phoneText: string;
    email: string;
    phone: string;
  };
  community: { title: string; cards: Course[] };
};

/** Type of the former page layout, still used by the old components of this folder. */
export type AssetPageT = {
  hero: {
    title: string;
    description?: string;
    image?: string;
    bgGraphic: string;
  };
  intro: {
    title: string;
    subTitle: string;
    bgGraphic: string; // optional supporting image; can be a 1x1 if unused
    paragraph: string;
    emailText: string; // e.g. "Email us"
    phoneText: string; // e.g. "Call"
    email: string;
    phone: string;
  };
  community: {
    title: string;
    cards: Array<{
      title: string;
      desc?: string;
      image?: string;
      gradient: string; // e.g. "from-amber-600 via-slate-700 to-slate-900"
      link: string;
      cta?: string;
    }>;
  };
};
