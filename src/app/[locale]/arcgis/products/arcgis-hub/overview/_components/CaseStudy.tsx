"use client";

import { useState } from "react";
import VideoModal from "@/components/VideoModal";
import { useCommon } from "@/i18n/useCommon";
import Image from "next/image";
import type { HubOverviewMessages } from "../constants";

export default function CaseStudy({
  data,
}: {
  data: HubOverviewMessages["caseStudy"];
}) {
  const [selectedPillIndex, setSelectedPillIndex] = useState(0);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const common = useCommon();

  const selectedPill = data.pills[selectedPillIndex];

  const handleActionClick = (pill: (typeof data.pills)[0], index: number) => {
    if (pill.actionType === "video" && pill.actionUrl) {
      setVideoUrl(pill.actionUrl);
      setShowVideoModal(true);
    } else if (pill.actionType === "story" && pill.actionUrl) {
      window.open(pill.actionUrl, "_blank");
    }
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setVideoUrl("");
  };

  // Function to get action text based on pill or use defaults
  const getActionText = (pill: (typeof data.pills)[0]) => {
    if (pill.actionText) return pill.actionText;
    return pill.actionType === "video" ? common.watchVideo : common.readStory;
  };

  return (
    <>
      <section className="py-16 lg:py-24 relative">
        <Image
          src={data.background}
          alt=""
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 -z-10 opacity-80"
        />
        <div className="mx-auto w-full max-w-[1200px] px-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              {data.headTitle}
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              {selectedPill?.title || data.title}
            </h2>

            {/* Quote Section */}
            {selectedPill?.desc ? (
              <div className="max-w-3xl mx-auto mb-8">
                <div className="flex items-start gap-4">
                  {/* Quote Icon */}
                  <svg
                    className="w-8 h-8 text-white/80 flex-shrink-0 mt-1"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 64 64"
                    fill="currentColor"
                  >
                    <g>
                      <path
                        d="M62,16.9224243V7.2230225c-9.9628906,0-18.6026611,5.6433105-22.9127197,13.9044189
                        c-1.8622437,3.569397-2.9210205,7.6246338-2.9210205,11.9293213V56h18.541626C58.7352295,56,62,52.7352295,62,48.7078857
                        V33.0570068H45.8654785C45.8654785,24.1460571,53.0891724,16.9224243,62,16.9224243z"
                      ></path>
                      <path
                        d="M5.0872803,21.1274414c-1.8622437,3.569397-2.9210205,7.6246338-2.9210205,11.9293213V56h18.541626
                        C24.7352295,56,28,52.7352295,28,48.7078857V33.0570068H11.8654785c0-8.9109497,7.2236938-16.1345825,16.1345215-16.1345825
                        V7.2230225C18.0371094,7.2230225,9.3973389,12.866333,5.0872803,21.1274414z"
                      ></path>
                    </g>
                  </svg>

                  {/* Quote Content */}
                  <div className="flex-1">
                    <p className="text-lg md:text-xl text-white leading-relaxed italic">
                      "{selectedPill.desc}"
                    </p>
                    {selectedPill.attribution && (
                      <p className="text-white/80 text-sm md:text-base mt-3 font-medium">
                        {selectedPill.attribution}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-lg md:text-xl text-white leading-relaxed max-w-3xl mx-auto mb-8">
                {data.desc}
              </p>
            )}

            <button
              onClick={() =>
                handleActionClick(
                  selectedPill || data.pills[0],
                  selectedPillIndex
                )
              }
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {getActionText(selectedPill || data.pills[0])}
              {selectedPill?.actionType === "video" ? (
                <svg
                  className="ml-3 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                </svg>
              ) : (
                <svg
                  className="ml-3 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Pills Grid */}
          <div className="flex flex-wrap justify-center gap-4 lg:gap-6 max-w-4xl mx-auto">
            {data.pills.map((p, i) => (
              <button
                key={`${p.label}-${i}`}
                onClick={() => setSelectedPillIndex(i)}
                className={`group relative p-6 lg:p-8 rounded-2xl transition-all duration-300 transform hover:scale-105 w-40 lg:w-48 ${
                  i === selectedPillIndex
                    ? "bg-blue-600 text-white shadow-2xl border-2 border-blue-500"
                    : "bg-white text-gray-700 shadow-lg hover:shadow-xl border-2 border-gray-200 hover:border-blue-300"
                }`}
              >
                {/* Image Container */}
                {p.image && (
                  <div
                    className={`w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4 rounded-xl overflow-hidden shadow-md ${
                      i === selectedPillIndex ? "ring-4 ring-white/30" : ""
                    }`}
                  >
                    <Image
                      src={p.image}
                      alt={p.label}
                      width={80}
                      height={80}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                {/* Label */}
                <div className="text-center">
                  <span
                    className={`text-sm lg:text-base font-semibold leading-tight ${
                      i === selectedPillIndex
                        ? "text-white"
                        : "text-gray-800 group-hover:text-blue-600"
                    }`}
                  >
                    {p.label}
                  </span>
                </div>

                {/* Selected Indicator */}
                {i === selectedPillIndex && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-4 h-4 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      <VideoModal open={showVideoModal} url={videoUrl} onClose={closeVideoModal} />
    </>
  );
}
