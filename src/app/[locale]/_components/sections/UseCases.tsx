import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine } from "react-icons/ri";

type UseCase = {
  tag: string;
  title: string;
  desc: string;
  href: string;
  image: string;
  /** Part of the illustration kept visible inside the 4:3 frame (CSS object-position). */
  focus?: string;
};

export type UseCasesMsgs = {
  eyebrow: string;
  title: string;
  subtitle: string;
  more: string;
  items: UseCase[];
};

/**
 * Home page "use cases" grid. Each card links to an existing page of the site
 * and reuses an Esri visual of that page as its illustration.
 */
export default function UseCases({
  data,
  locale,
}: {
  data: UseCasesMsgs;
  locale: string;
}) {
  return (
    <section className="bg-[#07131f] text-white">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-6 py-14 lg:py-20">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-sky-300">
            <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
            {data.eyebrow}
          </p>
          <h2 className="mt-3 text-[28px] sm:text-[36px] font-bold leading-[1.12]">
            {data.title}
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-slate-300">
            {data.subtitle}
          </p>
        </div>

        <ul className="mt-8 lg:mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item) => (
            <li key={item.href}>
              <Link
                href={`/${locale}${item.href}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0b1d2e] transition-colors duration-200 hover:border-sky-400/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07131f]"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-[#03080e]">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 460px, (min-width: 640px) 50vw, 100vw"
                    quality={70}
                    style={{ objectPosition: item.focus ?? "center" }}
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  {/* Navy tint so light and dark pictures sit together on the dark section; it lifts on hover */}
                  <div
                    className="absolute inset-0 bg-[#1a4672] mix-blend-multiply opacity-60 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 motion-reduce:transition-none"
                    aria-hidden
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#0b1d2e] via-transparent to-transparent"
                    aria-hidden
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-[#07131f]/80 px-3 py-1 text-[12px] font-semibold tracking-wide text-sky-200 backdrop-blur-sm">
                    {item.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                  <h3 className="text-[18px] font-semibold leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-[14.5px] leading-relaxed text-slate-300">
                    {item.desc}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-[14px] font-semibold text-sky-300 group-hover:text-sky-200">
                    {data.more}
                    <RiArrowRightLine
                      className="h-4 w-4 transition-transform group-hover:translate-x-1 motion-reduce:transition-none"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
