import type { ContactTopicKey } from "./form-rules";

export type ContactTopic = {
  icon: string;
  title: string;
  desc: string;
  /** mailto:, tel: or an internal path (the locale is added automatically). */
  link: string;
  cta: string;
};

export type ContactFormMsgs = {
  kicker: string;
  title: string;
  subtitle: string;
  requiredNote: string;
  optional: string;
  /** label of the hidden anti-robot field, read only if the styles of the page fail to load */
  trapLabel: string;
  name: string;
  organization: string;
  email: string;
  phone: string;
  topic: string;
  topicPlaceholder: string;
  message: string;
  messageHint: string;
  topics: Record<ContactTopicKey, string>;
  consent: string;
  privacy: string;
  submit: string;
  sending: string;
  errors: {
    name: string;
    email: string;
    phone: string;
    topic: string;
    message: string;
    consent: string;
    summary: string;
    failed: string;
    rateLimited: string;
  };
  success: { title: string; text: string; again: string };
};

export type ContactPageT = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    formCta: string;
    callCta: string;
    image: string;
  };
  form: ContactFormMsgs;
  details: { title: string; text: string };
  topics: {
    kicker: string;
    title: string;
    subtitle: string;
    cards: ContactTopic[];
  };
};

/** Address, phones, fax and e-mail: shared with the footer (messages/<lang>/home.json → footer.contact). */
export type ContactInfo = {
  addressLabel: string;
  address: string[];
  mapLabel: string;
  phoneLabel: string;
  phones: string[];
  faxLabel: string;
  fax: string;
  emailLabel: string;
  email: string;
};

/** Anchor of the form section (hero button → form). */
export const FORM_ID = "contact-form";

export const telHref = (n: string) => `tel:${n.replace(/[^+\d]/g, "")}`;

export const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1] focus-visible:ring-offset-2";
