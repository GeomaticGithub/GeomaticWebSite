"use client";
import { useCommon } from "@/i18n/useCommon";

import { useState } from "react";
import Image from "next/image";
import type { PowerBIMessages } from "../constants";

export default function HowItWorks({ data }: { data: PowerBIMessages["how"] }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const common = useCommon();

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  return (
    <section className="bg-white">
      <div className="flex flex-col gap-6 mx-auto max-w-[1200px] px-6 pt-10">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl md:text-3xl font-semibold text-center text-gray-900">
            {data.title}
          </h3>
          <p className="text-center text-gray-600 w-1/2 mx-auto">{data.desc}</p>
        </div>

        <div className="relative mt-8 mb-8">
          <div
            className="relative h-[300px] md:h-[400px] lg:h-[500px] cursor-pointer group"
            onClick={openVideo}
          >
            <Image
              src="/arcgisMapsForPowerBI/powerbi-how-it-works-collage.jpg"
              alt={common.videoThumbnail}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 rounded-full p-6 shadow-lg transition-all duration-300 group-hover:bg-white group-hover:scale-110">
                <svg
                  className="w-12 h-12 text-gray-800"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            <div className="absolute inset-0 transition-colors duration-300" />
          </div>
        </div>

        {isVideoOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={closeVideo}
          >
            <div
              className="relative w-full max-w-4xl mx-4 aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label={common.closeVideo}
                onClick={closeVideo}
                className="absolute -top-8 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <iframe
                src="https://www.youtube.com/embed/8GkCBsblY_g?si=RY9StV7F_fIOfrVv"
                title={data.title}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
