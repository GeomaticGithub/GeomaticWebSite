import type { IconType } from "react-icons";
import { RiEarthLine, RiMapPin2Line, RiLandscapeLine, RiTeamLine } from "react-icons/ri";
import { kickerClass, type AboutPageT } from "../constants";

/** Key figures, right under the hero. */
export function Stats({ data }: { data: AboutPageT["stats"] }) {
  return (
    <section className="border-b border-slate-200 bg-white">
      <dl className="mx-auto grid max-w-[1440px] grid-cols-2 px-4 lg:grid-cols-4 lg:px-6">
        {data.map((s, i) => (
          <div
            key={s.label}
            // two columns on phones (divider between columns and rows), four in a row from lg up
            className={[
              "flex flex-col-reverse justify-end gap-1 border-slate-200 py-7 pr-4 lg:py-9",
              i % 2 ? "border-l pl-5" : "",
              i > 1 ? "border-t lg:border-t-0" : "",
              i > 0 ? "lg:border-l lg:pl-8" : "",
            ].join(" ")}
          >
            <dt className="text-[15px] leading-snug text-slate-700">{s.label}</dt>
            <dd className="text-[34px] font-bold leading-none tracking-tight text-[#005e95] sm:text-[42px]">
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/** Who we are: the company in three paragraphs, with its international partners. */
export function Story({ data }: { data: AboutPageT["story"] }) {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-16 lg:grid-cols-12 lg:gap-16 lg:px-6 lg:py-24">
        <div className="lg:col-span-5">
          <p className={`${kickerClass} text-[#005e95]`}>
            <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
            {data.kicker}
          </p>
          <h2 className="mt-4 text-[30px] font-bold leading-[1.12] text-slate-900 sm:text-[40px]">{data.title}</h2>
        </div>

        <div className="lg:col-span-7">
          <p className="text-[20px] leading-relaxed text-slate-900">{data.lead}</p>
          {data.paragraphs.map((p) => (
            <p key={p} className="mt-5 text-[17px] leading-relaxed text-slate-700">
              {p}
            </p>
          ))}

          <div className="mt-8 border-t border-slate-200 pt-6">
            <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-slate-600">
              {data.partnersLabel}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {data.partners.map((name) => (
                <li
                  key={name}
                  className="rounded-full border border-slate-300 bg-slate-50 px-4 py-1.5 text-[15px] font-medium text-slate-800"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const ICONS: Record<string, IconType> = {
  gis: RiEarthLine,
  imagery: RiLandscapeLine,
  gps: RiMapPin2Line,
  consulting: RiTeamLine,
};

/** What we do: four areas of expertise. */
export function Expertise({ data }: { data: AboutPageT["expertise"] }) {
  return (
    <section className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-6 lg:py-20">
        <p className={`${kickerClass} text-[#005e95]`}>
          <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
          {data.kicker}
        </p>
        <h2 className="mt-4 text-[30px] font-bold leading-[1.12] text-slate-900 sm:text-[40px]">{data.title}</h2>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item) => {
            const Icon = ICONS[item.icon] ?? RiEarthLine;
            return (
              <li key={item.title} className="rounded-lg border border-slate-200 bg-white p-6">
                <span
                  className="flex h-12 w-12 items-center justify-center rounded-md bg-[#0079c1]/[0.08] text-[#0079c1]"
                  aria-hidden
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-[19px] font-semibold leading-snug text-slate-900">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{item.desc}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
