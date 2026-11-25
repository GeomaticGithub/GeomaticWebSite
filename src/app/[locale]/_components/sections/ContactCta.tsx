import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

export type ContactCtaMsgs = {
  title: string;
  subtitle: string;
  primary: string;
  secondary: string;
};

/** Closing band of the home page: one primary action (contact) and one secondary link (what is GIS). */
export default function ContactCta({
  data,
  locale,
  secondary = true,
}: {
  data: ContactCtaMsgs;
  locale: string;
  /** set to false on the "What is GIS" page itself, where the second button would point to the same page */
  secondary?: boolean;
}) {
  return (
    <section className="bg-gradient-to-r from-[#005e95] via-[#0079c1] to-[#0079c1] text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-4 lg:px-6 py-14 lg:py-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-[28px] sm:text-[36px] font-bold leading-[1.15]">
            {data.title}
          </h2>
          <p className="mt-3 text-[17px] leading-relaxed text-white/90">
            {data.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href={`/${locale}/about-geomatic/contact`}
            className="group inline-flex items-center justify-center gap-2 bg-white px-6 py-3.5 text-[15px] font-semibold text-[#005e95] transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0079c1]"
          >
            {data.primary}
            <RiArrowRightLine
              className="h-5 w-5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
              aria-hidden
            />
          </Link>
          {secondary && (
          <Link
            href={`/${locale}/what-is-gis/overview`}
            className="inline-flex items-center justify-center border border-white/70 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0079c1]"
          >
            {data.secondary}
          </Link>
          )}
        </div>
      </div>
    </section>
  );
}
