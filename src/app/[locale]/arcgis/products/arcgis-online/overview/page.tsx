import {
  HeroSection,
  FeaturesGrid,
  DesignedSection,
  ExpandWorkSection,
  SuccessStorySection,
} from "./_components";
import type { AOOverviewMessages } from "./constants";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/arcgis/products/arcgis-online/overview");

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const isFr = params.locale?.toLowerCase().startsWith("fr");
  const messages: AOOverviewMessages = isFr
    ? (await import("@/messages/fr/products/arcgis-online/overview.json")).default
    : (await import("@/messages/en/products/arcgis-online/overview.json")).default;
  const cta = isFr
    ? (await import("@/messages/fr/home.json")).default.home.contactCta
    : (await import("@/messages/en/home.json")).default.home.contactCta;
  const locale = params.locale;

  return (
    <>
      <HeroSection hero={messages.hero} intro={messages.intro.text} ui={messages.ui} locale={locale} />
      <FeaturesGrid power={messages.power} features={messages.features} ui={messages.ui} locale={locale} />
      <DesignedSection designed={messages.designed} ui={messages.ui} />
      <ExpandWorkSection expand={messages.expand} ui={messages.ui} locale={locale} />
      <SuccessStorySection story={messages.success} ui={messages.ui} locale={locale} />
      <ContactCta data={cta} locale={locale} />
    </>
  );
}
