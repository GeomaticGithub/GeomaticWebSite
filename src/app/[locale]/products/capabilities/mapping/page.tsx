import ProductPage from "@/app/[locale]/arcgis/products/_shared/ProductPage";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/products/capabilities/mapping");

// Layout: arcgis/products/_shared/ProductPage.tsx; content: messages/<lang>/product-pages/mapping.json
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return ProductPage({ slug: "mapping", locale: params.locale });
}
