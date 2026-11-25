"use client";

import { usePathname } from "next/navigation";

type DualPromoMsgs = {
  aboutTitle: string;
  aboutAria: string;
  gisTitle: string;
  gisAria: string;
};

function getCurrentLocaleFromPath(pathname: string): string {
  const seg = pathname.split("/")[1];
  return /^[a-z]{2}-[a-z]{2}$/i.test(seg) ? seg : "en-ma";
}

export default function DualPromoStrip({ data }: { data: DualPromoMsgs }) {
  const aboutBg = "/flat-cartoon-side-view-of-high-rise-building-city-town-vector.jpg";
  const gisBg = "/GIS-Blog-Header.webp";

  const pathname = usePathname();
  const locale = getCurrentLocaleFromPath(pathname);

  const aboutHref = `/${locale}/about-geomatic/overview`;
  const gisHref = `/${locale}/what-is-gis/overview`;

  return (
    <section>
      <div className="mx-auto max-w-[1440px] grid md:grid-cols-2">
        <a
          href={aboutHref}
          aria-label={data.aboutAria}
          className="relative block isolate overflow-hidden group transition duration-200 hover:ring-2 hover:ring-white/90 hover:ring-inset"
        >
          <img
            src={aboutBg}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover brightness-75 transition duration-200 group-hover:brightness-90"
          />
          <div className="relative z-10 px-8 lg:px-14 py-20 text-white flex items-center justify-center">
            <h3 className="text-2xl font-semibold text-center">{data.aboutTitle}</h3>
          </div>
        </a>

        <a
          href={gisHref}
          aria-label={data.gisAria}
          className="relative block isolate overflow-hidden group transition duration-200 hover:ring-2 hover:ring-white/90 hover:ring-inset"
        >
          <img
            src={gisBg}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover brightness-75 transition duration-200 group-hover:brightness-90"
          />
          <div className="relative z-10 px-8 lg:px-14 py-20 text-white flex items-center justify-center">
            <h3 className="text-2xl font-semibold text-center">{data.gisTitle}</h3>
          </div>
        </a>
      </div>
    </section>
  );
}
