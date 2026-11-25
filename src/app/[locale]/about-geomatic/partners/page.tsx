import { Hero, Categories } from "./_components";
import type { PartnerListT, PartnersPageT } from "./constants";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/about-geomatic/partners");

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const isFr = params.locale?.toLowerCase().startsWith("fr");
  const t: PartnersPageT = isFr
    ? (await import("@/messages/fr/about-geomatic/partners/index.json")).default
    : (await import("@/messages/en/about-geomatic/partners/index.json")).default;
  // The partners themselves are maintained on the three sub-pages; this page lists them all.
  const lists: Record<string, PartnerListT> = isFr
    ? {
        technology: (await import("@/messages/fr/about-geomatic/partners/technology/index.json")).default,
        solutions: (await import("@/messages/fr/about-geomatic/partners/solutions/index.json")).default,
        imagery: (await import("@/messages/fr/about-geomatic/partners/imagery/index.json")).default,
      }
    : {
        technology: (await import("@/messages/en/about-geomatic/partners/technology/index.json")).default,
        solutions: (await import("@/messages/en/about-geomatic/partners/solutions/index.json")).default,
        imagery: (await import("@/messages/en/about-geomatic/partners/imagery/index.json")).default,
      };
  const cta = isFr
    ? (await import("@/messages/fr/home.json")).default.home.contactCta
    : (await import("@/messages/en/home.json")).default.home.contactCta;

  return (
    <>
      <Hero data={t.hero} />
      <Categories data={t} lists={lists} locale={params.locale} />
      <ContactCta data={cta} locale={params.locale} />
    </>
  );
}
