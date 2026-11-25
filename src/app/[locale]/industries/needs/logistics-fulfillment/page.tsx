import NeedPage from "@/app/[locale]/industries/_shared/NeedPage";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/industries/needs/logistics-fulfillment");

// Layout and blocks: industries/_shared/NeedPage.tsx; reading of the content file: industries/_shared/need.ts
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return NeedPage({ slug: "logistics-fulfillment", locale: params.locale });
}
