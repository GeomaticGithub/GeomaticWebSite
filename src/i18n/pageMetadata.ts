// Localized <title> for every page, built from the (already translated) navigation labels.
// Usage in a page:  export const generateMetadata = pageMetadata("/industries/banking/overview");
import type { Metadata } from "next";
import enHome from "@/messages/en/home.json";
import frHome from "@/messages/fr/home.json";
import { buildMenus } from "@/app/[locale]/_components/buildMenus";
import { normalizeSections } from "@/app/[locale]/_components/utils";
import type { NavLinks, NavMessages } from "@/app/[locale]/_components/types";

type Lang = "en" | "fr";
const NAV: Record<Lang, NavMessages> = {
  en: enHome.nav as NavMessages,
  fr: frHome.nav as NavMessages,
};

/** Pages whose menu link uses another URL (redirects) or a differently named route. */
const NAV_KEY: Record<string, keyof NavLinks> = {
  "/industries/needs/economic-development": "economicDevelopment",
  "/industries/needs/facility-management": "facilityManagement",
  "/industries/needs/field-service-management": "fieldServiceManagement",
  "/industries/needs/performance-monitoring": "performanceMonitoring",
  "/industries/needs/situational-awareness": "situationalAwareness",
  "/industries/solutions/building-and-facilities-management": "buildingAndFacilitiesManagement",
  "/industries/solutions/drone": "droneSurveillance",
  "/industries/solutions/gdi": "telecominfrastructureManagement",
  "/industries/solutions/oil": "oilSpillMonitoring",
};

/** Pages that are not in the menu at all. */
const EXTRA: Record<string, Record<Lang, string>> = {
  "/about-geomatic/partners/imagery": { en: "Imagery partners", fr: "Partenaires imagerie" },
  "/about-geomatic/partners/solutions": { en: "Solution partners", fr: "Partenaires solutions" },
  "/about-geomatic/partners/technology": { en: "Technology partners", fr: "Partenaires technologiques" },
  "/arcgis/products/arcgis-online/capabilities/analyze-data": {
    en: "Analyze data – ArcGIS Online",
    fr: "Analyser les données – ArcGIS Online",
  },
  "/arcgis/products/arcgis-online/capabilities/share-collaborate": {
    en: "Share and collaborate – ArcGIS Online",
    fr: "Partager et collaborer – ArcGIS Online",
  },
  "/industries": { en: "Solutions by industry and need", fr: "Solutions par secteur et par besoin" },
  "/news": { en: "Publications", fr: "Publications" },
  "/support-services/learning/courses": { en: "Training courses", fr: "Catalogue des formations" },
  "/support-services/learning/schedule": { en: "Course schedule", fr: "Calendrier des formations" },
};

function navLabels(lang: Lang): Record<string, string> {
  const out: Record<string, string> = {};
  for (const entry of Object.values(buildMenus(NAV[lang]))) {
    for (const sec of normalizeSections(entry.sections)) {
      for (const link of sec.links) out[link.href.replace(/\/$/, "")] ??= link.label;
    }
  }
  return out;
}
const LABELS: Record<Lang, Record<string, string>> = { en: navLabels("en"), fr: navLabels("fr") };

export function pageTitle(route: string, locale: string): string | undefined {
  const lang: Lang = locale === "fr-ma" ? "fr" : "en";
  const key = NAV_KEY[route];
  return EXTRA[route]?.[lang] ?? (key ? NAV[lang].links[key] : undefined) ?? LABELS[lang][route];
}

export function pageMetadata(route: string) {
  return async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    // Next.js 15: the parameters of the address are a Promise
    const params = await props.params;
    const label = pageTitle(route, params.locale);
    return label ? { title: `${label} | Geomatic` } : {};
  };
}
