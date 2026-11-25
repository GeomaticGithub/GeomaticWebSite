/** Product pages that exist on this site (folder names under /arcgis/products). */
const LOCAL_PRODUCTS = new Set([
  "arcgis-online",
  "arcgis-pro",
  "arcgis-enterprise",
  "arcgis-for-developers",
  "arcgis-hub",
  "arcgis-urban",
  "arcgis-excalibur",
  "arcgis-insights",
  "arcgis-business-analyst",
  "arcgis-indoors",
  "arcgis-mission",
  "arcgis-maps-for-office",
  "arcgis-maps-for-power-bi",
  "arcgis-maps-for-sharepoint",
]);

export type Resolved = { href: string | null; external: boolean };

/**
 * Where a link of the content really goes:
 * - an esri.com product page that also exists on this site → the page of this site;
 * - a path starting with "/" → that page, with the locale;
 * - another web address → that address, opened in a new tab;
 * - "#" or nothing → no link (the text is shown without one).
 */
export function resolveLink(href: string | undefined, locale: string): Resolved {
  if (!href || href === "#") return { href: null, external: false };
  const m = /^https?:\/\/www\.esri\.com\/en-us\/arcgis\/products\/([a-z0-9-]+)(\/overview)?(?:[?#].*)?$/.exec(href);
  if (m) {
    if (LOCAL_PRODUCTS.has(m[1])) return { href: `/${locale}/arcgis/products/${m[1]}/overview`, external: false };
    if (m[1] === "index") return { href: `/${locale}/arcgis/products/index`, external: false };
  }
  if (href.startsWith("#")) return { href, external: false }; // a section of the same page
  if (/^https?:\/\//.test(href)) return { href, external: true };
  if (href.startsWith("/")) return { href: `/${locale}${href}`, external: false };
  return { href: null, external: false };
}
