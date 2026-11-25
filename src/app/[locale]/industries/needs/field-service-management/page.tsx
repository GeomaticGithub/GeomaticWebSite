import NeedPage from "@/app/[locale]/industries/_shared/NeedPage";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/industries/needs/field-service-management");

// Layout and blocks: industries/_shared/NeedPage.tsx; reading of the content file: industries/_shared/need.ts
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return NeedPage({ slug: "field-service-management", locale: params.locale });
}
