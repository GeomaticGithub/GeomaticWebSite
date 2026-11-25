import SectorPage from "@/app/[locale]/industries/_shared/SectorPage";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/industries/health/overview");

// Layout and blocks: industries/_shared/SectorPage.tsx; which blocks this sector shows: industries/_shared/sector.ts
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return SectorPage({ slug: "health", locale: params.locale });
}
