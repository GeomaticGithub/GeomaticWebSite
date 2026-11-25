"use client";

import { useState } from "react";
import Image from "next/image";
import { RiArrowRightUpLine, RiPlayFill } from "react-icons/ri";
import VideoModal from "@/components/VideoModal";
import { useCommon } from "@/i18n/useCommon";
import type { SectorStory } from "./sector";

const ring =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07131f]";

/** A customer story on the dark brand colour: picture, text and one action (the video, or the written case study). */
export default function StoryBand({ story, kicker, readLabel }: { story: SectorStory; kicker: string; readLabel: string }) {
  const common = useCommon();
  const [open, setOpen] = useState(false);
  const { videoUrl, docUrl } = story;

  return (
    <section className="bg-[#07131f] text-white">
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-4 py-16 lg:grid-cols-2 lg:gap-16 lg:px-6 lg:py-24">
        {story.image && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-[#0b1d2e]">
            <Image src={story.image} alt="" fill sizes="(min-width: 1024px) 700px, 100vw" className="object-cover" />
            {videoUrl && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                aria-label={`${common.watchVideo} : ${story.title}`}
                className={`group absolute inset-0 flex items-center justify-center bg-[#07131f]/30 transition-colors hover:bg-[#07131f]/15 ${ring}`}
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#005e95] shadow-xl transition-transform group-hover:scale-105 motion-reduce:transition-none">
                  <RiPlayFill className="h-8 w-8" aria-hidden />
                </span>
              </button>
            )}
          </div>
        )}

        <div className={story.image ? "" : "max-w-3xl lg:col-span-2"}>
          <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-sky-300">
            <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
            {kicker}
          </p>
          <h2 className="mt-4 text-[28px] font-bold leading-[1.15] sm:text-[36px]">{story.title}</h2>
          {story.text && <p className="mt-4 text-[17px] leading-relaxed text-slate-300">{story.text}</p>}

          {videoUrl ? (
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              className={`group mt-8 inline-flex items-center gap-3 border border-white/70 py-2.5 pl-2.5 pr-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 ${ring}`}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#005e95]" aria-hidden>
                <RiPlayFill className="h-5 w-5" />
              </span>
              {common.watchVideo}
            </button>
          ) : (
            docUrl && (
              <a
                href={docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 inline-flex items-center gap-2 border border-white/70 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 ${ring}`}
              >
                {readLabel}
                <RiArrowRightUpLine className="h-5 w-5" aria-hidden />
                <span className="sr-only"> {common.opensInNewTab}</span>
              </a>
            )
          )}
        </div>
      </div>

      {videoUrl && <VideoModal open={open} url={videoUrl} onClose={() => setOpen(false)} title={story.title} />}
    </section>
  );
}
