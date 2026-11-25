import PartnerListPage from "@/app/[locale]/about-geomatic/partners/_shared/PartnerListPage";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/about-geomatic/partners/technology");

// Layout: about-geomatic/partners/_shared/PartnerListPage.tsx; the partners themselves: messages/…/partners/technology/index.json
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return PartnerListPage({ family: "technology", locale: params.locale });
}
