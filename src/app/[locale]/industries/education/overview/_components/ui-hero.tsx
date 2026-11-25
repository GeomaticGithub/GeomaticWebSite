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
    <header
      className="relative text-white min-h-[500px] lg:min-h-[700px] overflow-hidden"
      style={{
        backgroundImage: data.backgroundImage
          ? `url(${data.backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 h-full">
        <div className="flex flex-col justify-center min-h-[500px] lg:min-h-[700px] py-14 md:py-16 ">
          {/* Text Content */}
          <h1 className="text-3xl font-semibold md:text-4xl lg:text-5xl text-white mb-6">
            {data.title}
          </h1>
          {data.kicker && (
            <p className="mb-8 max-w-3xl text-neutral-200 md:text-lg lg:text-xl leading-relaxed">
              {data.kicker}
            </p>
          )}

          {/* Video Button */}
          <div className="">
            <button
              onClick={handleVideoClick}
              className="group text-white px-4 py-2 border border-white hover:scale-105 flex items-center space-x-3"
            >
              <span className="font-semibold text-sm">{data.ctaHref}</span>
              <svg
                className="w-6 h-6 text-white"
                viewBox="0 0 16 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
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
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
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
