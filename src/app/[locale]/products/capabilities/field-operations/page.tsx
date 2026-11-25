import ProductPage from "@/app/[locale]/arcgis/products/_shared/ProductPage";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/products/capabilities/field-operations");

// Layout: arcgis/products/_shared/ProductPage.tsx; content: messages/<lang>/product-pages/field-operations.json
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return ProductPage({ slug: "field-operations", locale: params.locale });
}
