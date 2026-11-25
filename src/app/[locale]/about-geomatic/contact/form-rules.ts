// Validation rules shared by the contact form (browser) and /api/contact (server).
export const CONTACT_TOPICS = ["sales", "support", "training", "consulting", "other"] as const;
export type ContactTopicKey = (typeof CONTACT_TOPICS)[number];

export const CONTACT_LIMITS = {
  name: 100,
  organization: 150,
  email: 254,
  phone: 30,
  message: 4000,
  messageMin: 10,
} as const;

/** name@domain.tld, without spaces or the characters that separate or wrap addresses in a mail header. */
export const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
/** Digits with optional +, spaces, dots, dashes and parentheses; at least 8 digits. */
export const PHONE_RE = /^(?=(?:\D*\d){8,})[+\d][\d\s().-]*$/;
