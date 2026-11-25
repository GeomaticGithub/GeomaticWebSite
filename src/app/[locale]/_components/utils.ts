import type {
  SectionRaw,
  SimpleSection,
  GroupSection,
  SectionNormalized,
} from "./types";

/* ---------------- Helpers (pure) ---------------- */
export function isSimpleSection(sec: SectionRaw): sec is SimpleSection {
  return (
    typeof (sec as any)?.links !== "undefined" &&
    Array.isArray((sec as any).links)
  );
}

export function normalizeSections(raw: SectionRaw[]): SectionNormalized[] {
  return raw.flatMap((sec) =>
    isSimpleSection(sec)
      ? [{ heading: sec.heading, links: sec.links }]
      : Object.entries(sec as GroupSection).map(([heading, block]) => ({
          heading,
          links: block.links ?? [],
        }))
  );
}

export function splitIntoColumns<T>(arr: T[], cols: number): T[][] {
  if (cols <= 1) return [arr];
  const perCol = Math.ceil(arr.length / cols);
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += perCol)
    out.push(arr.slice(i, i + perCol));
  return out;
}

export function isExternalHref(href: string) {
  return (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("/content/")
  );
}

export function getCurrentLocaleFromPath(pathname: string): string {
  const seg = pathname.split("/")[1];
  return /^[a-z]{2}-[a-z]{2}$/i.test(seg) ? seg : "en-ma";
}

export function withLocale(locale: string, href: string) {
  if (isExternalHref(href)) return href;
  const path = href.startsWith("/") ? href : `/${href}`;
  const parts = path.split("/");
  if (/^[a-z]{2}-[a-z]{2}$/i.test(parts[1])) {
    return `/${locale}/${parts.slice(2).join("/")}`;
  }
  return `/${locale}${path}`;
}

export function switchLocaleInPath(pathname: string, target: string) {
  const parts = pathname.split("/");
  if (/^[a-z]{2}-[a-z]{2}$/i.test(parts[1])) {
    parts[1] = target;
  } else {
    parts.splice(1, 0, target);
  }
  return parts.join("/") || "/";
}

/** Languages shown by their own name (endonym): users look for their language, not a code like "FR-MA". */
export const LANGUAGES = [
  { code: "en-ma", label: "English", lang: "en" },
  { code: "fr-ma", label: "Français", lang: "fr" },
] as const;
export type LocaleCode = (typeof LANGUAGES)[number]["code"];
