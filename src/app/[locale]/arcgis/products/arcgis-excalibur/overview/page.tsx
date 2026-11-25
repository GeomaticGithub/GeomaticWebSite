import ProductPage from "@/app/[locale]/arcgis/products/_shared/ProductPage";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/arcgis/products/arcgis-excalibur/overview");

// Layout: arcgis/products/_shared/ProductPage.tsx; content: messages/<lang>/product-pages/arcgis-excalibur.json
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return ProductPage({ slug: "arcgis-excalibur", locale: params.locale });
}
