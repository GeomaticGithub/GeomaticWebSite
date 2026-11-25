import Image from "next/image";
import Link from "next/link";
import {
  RiArrowDownLine,
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiCheckLine,
} from "react-icons/ri";
import { getCommon } from "@/i18n/common";

type SplitFeatureMsgs = {
  kicker1: string;
  heading1: string;
  body1: string;
  points1: string[];
  row1Href: string;
  row1Cta: string;
  newsHref: string;
  newsTitle: string;
  newsCta: string;
  kicker2: string;
  heading2: string;
  body2: string;
  cta2: string;
  row2ImgAlt: string;
  tag: string;
  iotCaption: string;
};

const ARTICLE_HREF =
  "https://www.esri.com/about/newsroom/arcuser/expand-your-geospatial-horizons";

const kicker = "flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em]";
const heading = "mt-4 text-[30px] font-bold leading-[1.12] sm:text-[40px]";
const btn =
  "inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[15px] font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

/**
 * Two editorial rows under the hero:
 *   1. the ArcGIS platform (text left, "what's new" picture right) on white;
 *   2. the industries (picture left, text right) on the dark brand colour.
 */
export default function SplitFeature({
  data,
  locale,
}: {
  data: SplitFeatureMsgs;
  locale: string;
}) {
  const common = getCommon(locale);
  // "Nouveautés ArcGIS Online :" → shown as a title, without the trailing colon
  const newsTitle = data.newsTitle.replace(/\s*:\s*$/, "");
  // the trailing arrow of the caption is drawn as an icon
  const caption = data.iotCaption.replace(/\s*↗\s*$/, "");

  return (
    <section>
      {/* Row 1: the platform */}
      <div className="bg-white">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:gap-16 lg:px-6 lg:py-24 xl:gap-24">
          <div>
            <p className={`${kicker} text-[#005e95]`}>
              <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
              {data.kicker1}
            </p>
            <h2 className={`${heading} text-slate-900`}>{data.heading1}</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-slate-700">{data.body1}</p>

            <ul className="mt-6 space-y-3">
              {data.points1.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[16px] leading-snug text-slate-800">
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0079c1]/10 text-[#0079c1]"
                    aria-hidden
                  >
                    <RiCheckLine className="h-4 w-4" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <Link
              href={data.row1Href}
              className={`${btn} group mt-8 bg-[#0079c1] text-white hover:bg-[#005e95] focus-visible:ring-[#0079c1]`}
            >
              {data.row1Cta}
              <RiArrowRightLine
                className="h-5 w-5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                aria-hidden
              />
            </Link>
          </div>

          {/* Picture with the "what's new" card laid over its corner */}
          <div className="relative">
            <div
              className="absolute -bottom-4 -right-4 hidden h-2/3 w-2/3 rounded-lg bg-[#0079c1]/10 sm:block"
              aria-hidden
            />
            <Link
              href={data.newsHref}
              className="group relative block overflow-hidden rounded-lg bg-slate-100 shadow-[0_24px_48px_-24px_rgba(7,19,31,0.45)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1] focus-visible:ring-offset-4"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src="/arcgis-online-news.png"
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 660px, 100vw"
                  className="object-cover object-right transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>
              <div className="absolute inset-x-3 bottom-3 rounded-md bg-white p-4 shadow-lg sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-[330px] sm:p-5">
                <p className="text-[18px] font-semibold leading-snug text-slate-900">{newsTitle}</p>
                <p className="mt-2 inline-flex items-center gap-2 text-[15px] font-semibold text-[#0079c1] group-hover:text-[#005e95]">
                  {data.newsCta}
                  <RiArrowRightLine
                    className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                    aria-hidden
                  />
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Row 2: the industries */}
      <div className="bg-[#07131f] text-white">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-4 py-16 lg:grid-cols-2 lg:gap-16 lg:px-6 lg:py-24 xl:gap-24">
          <div className="lg:order-2">
            <p className={`${kicker} text-sky-300`}>
              <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
              {data.kicker2}
            </p>
            <h2 className={heading}>{data.heading2}</h2>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-slate-300">{data.body2}</p>
            <a
              href="#secteurs"
              className={`${btn} group mt-8 bg-white text-[#07131f] hover:bg-slate-200 focus-visible:ring-white focus-visible:ring-offset-[#07131f]`}
            >
              {data.cta2}
              <RiArrowDownLine
                className="h-5 w-5 transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none"
                aria-hidden
              />
            </a>
          </div>

          <a
            href={ARTICLE_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-lg border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#07131f] lg:order-1"
          >
            <div className="relative aspect-[4/3]">
              <Image
                src="/arcuser-banner-letter282-wide.jpg"
                alt={data.row2ImgAlt}
                fill
                sizes="(min-width: 1024px) 660px, 100vw"
                className="object-cover object-left transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            </div>
            {/* Tall dark gradient so the caption stays readable over the bright sky and grass */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#03080e] via-[#03080e]/80 to-transparent px-5 pb-5 pt-24 sm:px-6 sm:pb-6">
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-sky-200">{data.tag}</p>
              <p className="mt-2 text-[18px] font-medium leading-snug sm:text-[20px]">
                {caption}
                <RiArrowRightUpLine
                  className="ml-1.5 inline h-5 w-5 align-[-3px] text-sky-300 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden
                />
                <span className="sr-only"> {common.opensInNewTab}</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
