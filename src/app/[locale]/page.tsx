// app/[locale]/page.tsx
import { validateLocale, generateLocaleStaticParams } from "@/utils/locale";
import Hero from "@/app/[locale]/_components/sections/Hero";
import SplitFeature from "@/app/[locale]/_components/sections/SplitFeature";
import UseCases from "@/app/[locale]/_components/sections/UseCases";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import WhoUses from "@/app/[locale]/_components/sections/WhoUses";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

// Generate static params for valid locales only
export async function generateStaticParams() {
  return generateLocaleStaticParams();
}

export default async function HomePage(props: HomePageProps) {
  const params = await props.params;
  // Validate locale parameter (throws 404 if invalid)
  const locale = validateLocale(params.locale);

  const msgs =
    locale === "fr-ma"
      ? (await import("@/messages/fr/home.json")).default
      : (await import("@/messages/en/home.json")).default;

  const { home } = msgs;

  return (
    <>
      <Hero data={home.hero} />
      <SplitFeature data={home.splitFeature} locale={locale} />
      <WhoUses
        data={home.whoUses}
        labels={msgs.nav.links}
        locale={locale}
      />
      <UseCases data={home.useCases} locale={locale} />
      <ContactCta data={home.contactCta} locale={locale} />
    </>
  );
}
