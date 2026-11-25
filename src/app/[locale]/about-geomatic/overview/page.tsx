import { Hero, Stats, Story, Expertise, MissionVision } from "./_components";
import type { AboutPageT } from "./constants";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/about-geomatic/overview");

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const isFr = params.locale?.toLowerCase().startsWith("fr");
  const t: AboutPageT = isFr
    ? (await import("@/messages/fr/about-geomatic/overview/index.json")).default
    : (await import("@/messages/en/about-geomatic/overview/index.json")).default;
  // closing call to action, shared with the home page
  const cta = isFr
    ? (await import("@/messages/fr/home.json")).default.home.contactCta
    : (await import("@/messages/en/home.json")).default.home.contactCta;

  return (
    <>
      <Hero data={t.hero} />
      <Stats data={t.stats} />
      <Story data={t.story} />
      <Expertise data={t.expertise} />
      <MissionVision data={t.values} />
      <ContactCta data={cta} locale={params.locale} />
    </>
  );
}
