// types.ts
export type CTA = { label: string; href: string };

export type FeatureMsg = {
  title: string;
  p1: string;
  p2?: string;
  link1?: string;
  link2?: string;
};

export type SectionsMessages = Record<string, FeatureMsg>;

export type ShareItemMsg = {
  label: string;
  title: string;
  desc: string;
  linkText?: string;
  href?: string;
  avatarImage?: string;
  mainImage?: string;
};

export type ShareMessages = {
  title: string;
  description: string;
  cta?: string;
  items: Record<string, ShareItemMsg>;
};
