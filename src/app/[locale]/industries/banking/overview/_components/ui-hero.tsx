"use client";
import { CommonText } from "@/i18n/useCommon";
import Link from "next/link";
import type { HeroT } from "../constants";

export default function Hero({ data }: { data: HeroT }) {
  return (
    <header className="relative text-white">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[400px] lg:min-h-[450px]">
          {/* Image Section - Left Side */}
          <div className="order-2 lg:order-1 flex items-end">
            <div className="relative w-full aspect-video overflow-hidden bg-neutral-800">
              {data.mediaImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={data.mediaImage}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  {/* Document Link Overlay */}
                  {data.documentUrl && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Link
                        href={data.documentUrl}
                        className="group bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg hover:bg-white transition-all duration-300 hover:scale-105"
                      >
                        <span className="sr-only"><CommonText k="openDocument" /></span>
                        <div className="flex items-center space-x-3" aria-hidden>
                          {/* Document Icon */}
                          <div className="flex-shrink-0">
                            <svg
                              className="w-8 h-8 text-black"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                            </svg>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-black">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 opacity-50">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                    </div>
                    <p><CommonText k="documentPreview" /></p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Text Content - Right Side */}
          <div className="order-1 lg:order-2 flex flex-col justify-center py-14 md:py-16">
            {data.eyebrow && (
              <p className="mb-3 text-xs uppercase tracking-wider text-gray-600">
                {data.eyebrow}
              </p>
            )}
            <h1 className="text-2xl font-semibold md:text-3xl lg:text-3xl text-black">
              {data.title}
            </h1>
            {data.kicker && (
              <p className="mt-6 max-w-3xl text-gray-600 md:text-lg leading-relaxed">
                {data.kicker}
              </p>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
