import { RiEyeLine, RiFocus3Line } from "react-icons/ri";
import { kickerClass, type AboutPageT } from "../constants";

const ICONS = [RiFocus3Line, RiEyeLine];

/** Mission and vision, side by side on the dark brand colour. */
export default function MissionVision({ data }: { data: AboutPageT["values"] }) {
  return (
    <section className="bg-[#07131f] text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-6 lg:py-24">
        <p className={`${kickerClass} text-sky-300`}>
          <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
          {data.kicker}
        </p>
        <h2 className="mt-4 text-[30px] font-bold leading-[1.12] sm:text-[40px]">{data.title}</h2>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {data.cards.map((card, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <article
                key={card.label}
                className="relative overflow-hidden rounded-lg border border-white/10 bg-[#0b1d2e] p-7 sm:p-9"
              >
                <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#00a0e3] to-transparent" aria-hidden />
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#00a0e3]/15 text-sky-300"
                    aria-hidden
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-[14px] font-semibold uppercase tracking-[0.12em] text-sky-300">{card.label}</h3>
                </div>
                <p className="mt-6 text-[19px] leading-relaxed text-slate-100 sm:text-[21px]">{card.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
