"use client";

// The grid of customer stories: picture, sector, title, text and one action (the video in a dialog, or the page on esri.com).
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { RiArrowRightLine, RiArrowRightUpLine, RiPlayFill } from "react-icons/ri";
import VideoModal from "@/components/VideoModal";
import { useCommon } from "@/i18n/useCommon";
import type { NewsStory } from "../stories";

const ring = "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0079c1] focus-visible:ring-offset-2";

export default function StoryCards({
  stories,
  labels,
  locale,
  readLabel,
  sectorLabel,
}: {
  stories: NewsStory[];
  /** names of the sectors (nav.links) */
  labels: Record<string, string>;
  locale: string;
  readLabel: string;
  sectorLabel: string;
}) {
  const common = useCommon();
  const [playing, setPlaying] = useState<NewsStory | null>(null);

  return (
    <>
      <ul className="mt-10 grid gap-6 md:grid-cols-2">
        {stories.map((story) => {
          const sector = labels[story.sectorKey];
          return (
            <li key={story.sectorKey} className="flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white">
              {story.image && (
                <div className="relative aspect-[16/9] bg-[#07131f]">
                  <Image src={story.image} alt="" fill sizes="(min-width: 768px) 700px, 100vw" className="object-cover" />
                  {story.videoUrl && (
                    <button
                      type="button"
                      onClick={() => setPlaying(story)}
                      aria-haspopup="dialog"
                      aria-label={`${common.watchVideo} : ${story.title}`}
                      className={`group absolute inset-0 flex items-center justify-center bg-[#07131f]/30 transition-colors hover:bg-[#07131f]/15 ${ring} focus-visible:ring-inset focus-visible:ring-offset-0`}
                    >
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#005e95] shadow-xl transition-transform group-hover:scale-105 motion-reduce:transition-none">
                        <RiPlayFill className="h-7 w-7" aria-hidden />
                      </span>
                    </button>
                  )}
                </div>
              )}

              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[#005e95]">{sector}</p>
                <h3 className="mt-2 text-[22px] font-semibold leading-snug text-slate-900">{story.title}</h3>
                {story.text && <p className="mt-3 text-[16px] leading-relaxed text-slate-700">{story.text}</p>}

                <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-6">
                  {story.videoUrl ? (
                    <button
                      type="button"
                      onClick={() => setPlaying(story)}
                      aria-haspopup="dialog"
                      className={`inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#0079c1] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#005e95] ${ring}`}
                    >
                      <RiPlayFill className="h-5 w-5" aria-hidden />
                      {common.watchVideo}
                    </button>
                  ) : (
                    story.docUrl && (
                      <a
                        href={story.docUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[#0079c1] px-5 text-[15px] font-semibold text-white transition-colors hover:bg-[#005e95] ${ring}`}
                      >
                        {readLabel}
                        <RiArrowRightUpLine className="h-4 w-4" aria-hidden />
                        <span className="sr-only"> {common.opensInNewTab}</span>
                      </a>
                    )
                  )}
                  <Link
                    href={`/${locale}${story.sectorHref}`}
                    className={`group inline-flex items-center gap-2 text-[15px] font-semibold text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline ${ring}`}
                  >
                    {sectorLabel}
                    <span className="sr-only"> : {sector}</span>
                    <RiArrowRightLine className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {playing?.videoUrl && <VideoModal open url={playing.videoUrl} onClose={() => setPlaying(null)} title={playing.title} />}
    </>
  );
}
