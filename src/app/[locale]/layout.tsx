import type { Metadata } from "next";
import { validateLocale, generateLocaleStaticParams } from "@/utils/locale";
import Header from "@/app/[locale]/_components/Header";
import Footer from "@/app/[locale]/_components/Footer";
import { fontSans } from "@/styles/fonts";

const META = {
  "en-ma": {
    title: "Geomatic — ArcGIS & Geospatial Solutions",
    description:
      "ArcGIS-powered mapping, analytics, and services for every industry.",
  },
  "fr-ma": {
    title: "Geomatic — Solutions ArcGIS et géospatiales",
    description:
      "Cartographie, analyse spatiale et services basés sur ArcGIS pour tous les secteurs.",
  },
} as const;

// Unknown locales (e.g. /xx-yy) get the router's 404 directly instead of throwing
// notFound() inside this layout, which renders <html> and so cannot show app/not-found.tsx.
export const dynamicParams = false;

// Generate static params for valid locales only
export async function generateStaticParams() {
  return generateLocaleStaticParams();
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale === "fr-ma" ? "fr-ma" : "en-ma";
  return META[locale];
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Next.js 15: the parameters of the address are a Promise
  const { children } = props;
  const params = await props.params;
  // Validate locale parameter (throws 404 if invalid)
  const locale = validateLocale(params.locale);

  const msgs =
    locale === "fr-ma"
      ? (await import("@/messages/fr/home.json")).default
      : (await import("@/messages/en/home.json")).default;

  return (
    <html lang={locale === "fr-ma" ? "fr-MA" : "en-MA"} className={fontSans.variable}>
      <body className="bg-white text-slate-900 antialiased">
        <Header data={msgs.nav} locale={params.locale} />
        <main>{children}</main>
        <Footer data={msgs.footer} locale={params.locale} />
      </body>
    </html>
  );
}
