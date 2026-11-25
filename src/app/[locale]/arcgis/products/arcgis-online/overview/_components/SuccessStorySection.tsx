import Image from "next/image";
import { RiArrowRightUpLine } from "react-icons/ri";
import { getCommon } from "@/i18n/common";
import SmartLink, { linkKind } from "./SmartLink";
import { focusRing, kickerClass, type AOOverviewMessages } from "../constants";

/** Customer stories: one card per story. A story shows a button only when it has a real address. */
export default function SuccessStorySection({
  story,
  ui,
  locale,
}: {
  story: AOOverviewMessages["success"];
  ui: AOOverviewMessages["ui"];
  locale: string;
}) {
  const common = getCommon(locale);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-6 lg:py-24">
        <p className={`${kickerClass} text-[#005e95]`}>
          <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
          {ui.storiesKicker}
        </p>
        <h2 className="mt-4 text-[30px] font-bold leading-[1.12] text-slate-900 sm:text-[40px]">{ui.storiesTitle}</h2>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {story.pills.map((pill) => {
            const kind = linkKind(pill.actionUrl);
            return (
              <li key={pill.label} className="flex flex-col rounded-lg border border-slate-200 bg-white p-6">
                {pill.image && (
                  <Image
                    src={pill.image}
                    alt=""
                    width={56}
                    height={56}
                    className="h-14 w-14 rounded-md object-cover ring-1 ring-slate-200"
                  />
                )}
                <h3 className="mt-5 text-[19px] font-semibold leading-snug text-slate-900">{pill.title ?? pill.label}</h3>
                {pill.desc && <p className="mt-2 text-[15px] leading-relaxed text-slate-700">{pill.desc}</p>}
                {kind !== "none" && pill.actionText && (
                  <SmartLink
                    href={pill.actionUrl}
                    locale={locale}
                    className={`mt-auto inline-flex items-center gap-1.5 self-start pt-5 text-[15px] font-semibold text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline ${focusRing}`}
                  >
                    {pill.actionText}
                    {kind === "external" && (
                      <>
                        <RiArrowRightUpLine className="h-4 w-4" aria-hidden />
                        <span className="sr-only"> {common.opensInNewTab}</span>
                      </>
                    )}
                  </SmartLink>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
