'use client';
import { useCommon } from "@/i18n/useCommon";

import Image from "next/image";
import { useState } from "react";
import type { AssetPageT } from "../constants";

export default function Solution({ data }: { data: AssetPageT["solution"] }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const common = useCommon();

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.includes("watch?v=")
      ? url.split("watch?v=")[1].split("&")[0]
      : url.split("/").pop();
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  const openVideo = () => {
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <>
      <section>
        <div className="mx-auto grid items-center md:grid-cols-2 py-16 px-24">
          <div className="relative h-[450px] group">
            <Image
              src={data.image}
              alt={data.alt || ""}
              fill
              className="object-cover"
            />
            {data.youtubeUrl && (
              <button
                onClick={openVideo}
                className="absolute inset-0 flex items-center justify-center cursor-pointer"
                aria-label={common.playVideo}
              >
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg hover:scale-110 transition-transform duration-200">
                  <svg
                    className="w-8 h-8 text-red-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </button>
            )}
          </div>
          <div className="flex flex-col items-center gap-2">
            {data.eyebrow && (
              <p className="text-sm text-gray-500 uppercase tracking-widest">
                {data.eyebrow}
              </p>
            )}
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
              {data.title}
            </h3>
            <p className="text-gray-700 text-center w-3/4">{data.intro}</p>
          </div>
        </div>
      </section>

      {/* YouTube Video Popup */}
      {isVideoOpen && data.youtubeUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              type="button"
              aria-label={common.closeVideo}
              onClick={closeVideo}
              className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
            >
              <span aria-hidden>✕</span>
            </button>
            <div className="relative w-full h-0 pb-[56.25%]">
              <iframe
                src={getYouTubeEmbedUrl(data.youtubeUrl)}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={common.videoPlayer}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
