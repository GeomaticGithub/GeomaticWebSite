// utils/locale.ts
import { notFound } from "next/navigation";

// Define valid locales
export const validLocales = ["en-ma", "fr-ma"] as const;
export type ValidLocale = (typeof validLocales)[number];
export const defaultLocale: ValidLocale = "en-ma";

// Validate locale parameter and redirect to 404 if invalid
export function validateLocale(locale: string): ValidLocale {
  if (!validLocales.includes(locale as ValidLocale)) {
    notFound();
  }
  return locale as ValidLocale;
}

// Generate static params for valid locales only
export async function generateLocaleStaticParams() {
  return validLocales.map((locale) => ({
    locale: locale,
  }));
}

// Check if locale is valid without throwing
export function isValidLocale(locale: string): locale is ValidLocale {
  return validLocales.includes(locale as ValidLocale);
}
