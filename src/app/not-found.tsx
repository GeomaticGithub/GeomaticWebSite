// app/not-found.tsx
// Rendered for unmatched URLs and invalid locales. The root layout is a
// pass-through, so this page renders its own <html>/<body>.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { fontSans } from "@/styles/fonts";

const MESSAGES: Record<string, { title: string; subtitle: string; cta: string }> = {
  en: {
    title: "Page not found",
    subtitle: "The page you’re looking for doesn’t exist or was moved.",
    cta: "Back to home",
  },
  fr: {
    title: "Page introuvable",
    subtitle: "La page que vous recherchez n’existe pas ou a été déplacée.",
    cta: "Retour à l’accueil",
  },
};

export default function NotFound() {
  const pathname = usePathname() ?? "/";
  const seg = pathname.split("/")[1] ?? "";
  const locale = seg === "fr-ma" ? "fr-ma" : "en-ma";
  const lang = locale.split("-")[0]; // ex: en-ma -> en
  const t = MESSAGES[lang] || MESSAGES.en;

  return (
    <html lang={lang === "fr" ? "fr-MA" : "en-MA"} className={fontSans.variable}>
      <body className="bg-white text-slate-900 antialiased">
        <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
          {/* Subtle dark-blue gradient header bar */}
          <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0a192f] via-[#112240] to-[#1e3a8a]" />

          <p className="text-8xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-violet-400 to-violet-700">
            404
          </p>
          <h1 className="mt-4 text-3xl md:text-4xl font-semibold text-slate-900">
            {t.title}
          </h1>
          <p className="mt-2 max-w-prose text-slate-600">{t.subtitle}</p>

          <Link
            href={`/${locale}`}
            className="mt-6 inline-flex items-center rounded-2xl px-5 py-3 text-sm font-medium shadow-sm
                       bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:opacity-95 focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            {t.cta}
          </Link>
        </main>
      </body>
    </html>
  );
}
