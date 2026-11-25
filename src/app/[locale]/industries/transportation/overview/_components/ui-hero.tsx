"use client";
import { useCommon } from "@/i18n/useCommon";
import { useState } from "react";
import type { HeroT } from "../constants";

export default function Hero({ data }: { data: HeroT }) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const common = useCommon();

  const handleVideoClick = () => {
    setIsVideoOpen(true);
  };

  const closeVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <header className="relative bg-neutral-900 text-white">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[400px] lg:min-h-[500px]">
          {/* Video Section - Left Side */}
          <div className="order-2 lg:order-1 flex items-end">
            <div
              className="relative aspect-video overflow-hidden bg-neutral-800 cursor-pointer group w-full"
              onClick={handleVideoClick}
              role="button"
              tabIndex={0}
              aria-label={common.playVideo}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), handleVideoClick())}
            >
              {data.mediaImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={data.mediaImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-all duration-300">
                    <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                      <svg
                        className="w-8 h-8 text-white ml-1"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 opacity-50">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p>{common.clickToPlay}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className="order-1 lg:order-2 flex flex-col justify-center py-14 md:py-16">
            {data.eyebrow && (
              <p className="mb-3 text-xs uppercase tracking-wider text-neutral-300">
                {data.eyebrow}
              </p>
            )}
            <h1 className="text-2xl font-semibold md:text-3xl lg:text-3xl">
              {data.title}
            </h1>
            {data.kicker && (
              <p className="mt-6 max-w-3xl text-neutral-300 md:text-lg lg:text-xl leading-relaxed">
                {data.kicker}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal Popup */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-80"
            onClick={closeVideo}
          ></div>

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-4xl mx-4">
            {/* Close Button */}
            <button
              type="button"
              aria-label={common.closeVideo}
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg
                className="w-8 h-8"
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

            {/* Video iframe */}
            <div className="relative aspect-video overflow-hidden bg-black">
              {data.videoUrl && (
                <iframe
                  src={data.videoUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={common.videoPlayer}
                ></iframe>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
