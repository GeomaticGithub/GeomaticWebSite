export type ProductsIndexMessages = {
  ui: {
    kicker: string;
    contact: string;
    catalogue: string;
    flagshipKicker: string;
    flagshipTitle: string;
    featuredKicker: string;
    matrixKicker: string;
    filterLabel: string;
    filterPlaceholder: string;
    count: string;
    noResult: string;
    clear: string;
    ctasKicker: string;
    discover: string;
    onEsri: string;
  };
  hero: {
    title: string;
    subtitle: string;
    image: string;
    bgImage: string;
  };
  intro: { paragraph: string };
  tiles: {
    items: Array<{
      title: string;
      subtitle: string;
      image: string;
      href: string;
      accent?: string;
      icon: string;
    }>;
  };
  featured: {
    title: string;
    cards: Array<{
      title: string;
      subtitle: string;
      href: string;
      icon: string;
    }>;
  };
  matrix: {
    title: string;
    groups: Array<{
      title: string;
      columns: Array<Array<{ label: string; href: string }>>;
    }>;
  };
  ctas: {
    title: string;
    items: Array<{
      title: string;
      desc: string;
      href: string;
      icon?: string;
    }>;
  };
};

/** Products that have their own page on this site: they are linked here instead of esri.com. */
const LOCAL: Record<string, string> = {
  "ArcGIS Online": "arcgis-online",
  "ArcGIS Pro": "arcgis-pro",
  "ArcGIS Enterprise": "arcgis-enterprise",
  "ArcGIS for Developers": "arcgis-for-developers",
  "ArcGIS Hub": "arcgis-hub",
  "ArcGIS Urban": "arcgis-urban",
  "ArcGIS Excalibur": "arcgis-excalibur",
  "ArcGIS Insights": "arcgis-insights",
  "Insights for ArcGIS": "arcgis-insights",
  "ArcGIS Indoors": "arcgis-indoors",
  "ArcGIS Mission": "arcgis-mission",
  "ArcGIS Maps for Office": "arcgis-maps-for-office",
  "ArcGIS Maps for Power BI": "arcgis-maps-for-power-bi",
  "ArcGIS Maps for SharePoint": "arcgis-maps-for-sharepoint",
};

export type Resolved = { href: string | null; external: boolean };

/**
 * Where a product link really goes: a page of this site when it exists, else the esri.com address.
 * Placeholder addresses (not yet filled in the content) give no link at all rather than a broken one.
 */
export function resolveProductLink(label: string, href: string, locale: string): Resolved {
  const slug = LOCAL[label.trim()];
  if (slug) return { href: `/${locale}/arcgis/products/${slug}/overview`, external: false };
  if (/^https?:\/\//.test(href)) return { href, external: true };
  return { href: null, external: false };
}

export const kickerClass =
  "flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#005e95]";
export const focusRing =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1] focus-visible:ring-offset-2";
