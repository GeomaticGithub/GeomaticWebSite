"use client";

import { useState } from "react";
import Image from "next/image";
import { RiPlayFill } from "react-icons/ri";
import VideoModal from "@/components/VideoModal";
import { kickerClass, type AboutPageT } from "../constants";

export default function Hero({ data }: { data: AboutPageT["hero"] }) {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="relative isolate overflow-hidden bg-[#07131f] text-white">
      <Image src={data.bgGraphic} alt="" fill priority sizes="100vw" className="-z-10 object-cover object-right" />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#07131f] via-[#07131f]/80 to-[#07131f]/10"
        aria-hidden
      />

      <div className="mx-auto max-w-[1440px] px-4 py-20 lg:px-6 lg:py-28">
        <div className="max-w-xl">
          <p className={`${kickerClass} text-sky-300`}>
            <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
            {data.kicker}
          </p>
          <h1 className="mt-4 text-[38px] font-bold leading-[1.05] sm:text-[52px]">{data.title}</h1>
          {data.description && (
            <p className="mt-5 text-[20px] leading-relaxed text-slate-200">{data.description}</p>
          )}
          {data.ctaLabel && data.ctaHref && (
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              aria-haspopup="dialog"
              className="group mt-8 inline-flex items-center gap-3 border border-white/70 py-2.5 pl-2.5 pr-6 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#07131f]"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#005e95] transition-transform group-hover:scale-105 motion-reduce:transition-none"
                aria-hidden
              >
                <RiPlayFill className="h-5 w-5" />
              </span>
              {data.ctaLabel}
            </button>
          )}
        </div>
      </div>

      {data.ctaHref && (
        <VideoModal
          open={videoOpen}
          url={data.ctaHref}
          onClose={() => setVideoOpen(false)}
          title={data.ctaLabel}
        />
      )}
    </section>
  );
}
