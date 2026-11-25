import ProductPage from "@/app/[locale]/arcgis/products/_shared/ProductPage";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/arcgis/products/arcgis-maps-for-sharepoint/overview");

// Layout: arcgis/products/_shared/ProductPage.tsx; content: messages/<lang>/product-pages/arcgis-maps-for-sharepoint.json
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return ProductPage({ slug: "arcgis-maps-for-sharepoint", locale: params.locale });
}
