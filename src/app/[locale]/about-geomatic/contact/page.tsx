import { Hero, Write, Topics } from "./_components";
import type { ContactPageT } from "./constants";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/about-geomatic/contact");

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const isFr = params.locale?.toLowerCase().startsWith("fr");
  const t: ContactPageT = isFr
    ? (await import("@/messages/fr/about-geomatic/contact/index.json")).default
    : (await import("@/messages/en/about-geomatic/contact/index.json")).default;
  // Address, phones, fax and e-mail come from the footer data so they are maintained in one place.
  const contact = isFr
    ? (await import("@/messages/fr/home.json")).default.footer.contact
    : (await import("@/messages/en/home.json")).default.footer.contact;

  return (
    <>
      <Hero data={t.hero} contact={contact} />
      <Write form={t.form} details={t.details} contact={contact} locale={params.locale} />
      <Topics data={t.topics} locale={params.locale} />
    </>
  );
}
