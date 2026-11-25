import { Hero, Tiles, Featured, LinkMatrix, Ctas } from "./_components";
import type { ProductsIndexMessages } from "./constants";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";

import { pageMetadata } from "@/i18n/pageMetadata";

export const generateMetadata = pageMetadata("/arcgis/products/index");

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const isFr = params.locale?.toLowerCase().startsWith("fr");
  const t: ProductsIndexMessages = isFr
    ? (await import("@/messages/fr/arcgis/products/index.json")).default
    : (await import("@/messages/en/arcgis/products/index.json")).default;
  const cta = isFr
    ? (await import("@/messages/fr/home.json")).default.home.contactCta
    : (await import("@/messages/en/home.json")).default.home.contactCta;
  const locale = params.locale;

  return (
    <>
      <Hero data={t.hero} ui={t.ui} locale={locale} />
      <Tiles data={t.tiles} lead={t.intro.paragraph} ui={t.ui} locale={locale} />
      <Featured data={t.featured} ui={t.ui} locale={locale} />
      <LinkMatrix data={t.matrix} ui={t.ui} locale={locale} />
      <Ctas data={t.ctas} ui={t.ui} locale={locale} />
      <ContactCta data={cta} locale={locale} />
    </>
  );
}
