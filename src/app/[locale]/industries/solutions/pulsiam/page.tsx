import SolutionPage from "@/app/[locale]/industries/_shared/SolutionPage";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/industries/solutions/pulsiam");

// Layout and blocks: industries/_shared/SolutionPage.tsx; reading of the content file: industries/_shared/solution.ts
export default async function Page(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  return SolutionPage({ slug: "pulsiam", locale: params.locale });
}
