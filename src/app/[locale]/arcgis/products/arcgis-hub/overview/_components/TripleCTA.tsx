import Image from "next/image";
import Link from "next/link";
import type { HubOverviewMessages } from "../constants";

export default function TripleCTA({
  data,
}: {
  data: HubOverviewMessages["bottomInfo"];
}) {
  return (
    <section className="bg-[#5a38d6] relative overflow-hidden">
      {/* Background overlay image */}
      <Image
        src="/arcgisHub/hub-banner-bg.jpg"
        alt=""
        fill
        className="absolute inset-0 z-0 object-cover opacity-40"
      />

      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 text-white relative z-20">
        {/* Left Section */}
        <Link
          href={data.leftLink}
          className="group relative py-20 px-6 flex flex-col items-center justify-center text-center gap-4 cursor-pointer transition-all duration-300 hover:bg-blue-500/90 backdrop-blur-sm border-r border-white/10"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 p-3 bg-white/20 rounded-full flex items-center justify-center">
              <img
                src={data.leftImage}
                alt={data.leftTitle}
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">{data.leftTitle}</h3>
              <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                {data.leftDesc}
              </p>
            </div>
            <div className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white/90 group-hover:text-white">
              <span>{data.leftCta}</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
            </div>
          </div>
        </Link>

        {/* Center Section */}
        <Link
          href={data.centerLink}
          className="group relative py-20 px-6 flex flex-col items-center justify-center text-center gap-4 cursor-pointer transition-all duration-300 hover:bg-blue-600/90 backdrop-blur-sm border-r border-white/10"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 p-3 bg-white/20 rounded-full flex items-center justify-center">
              <img
                src={data.centerImage}
                alt={data.centerTitle}
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">{data.centerTitle}</h3>
              <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                {data.centerDesc}
              </p>
            </div>
            <div className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white/90 group-hover:text-white">
              <span>{data.centerCta}</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
            </div>
          </div>
        </Link>

        {/* Right Section */}
        <Link
          href={data.rightLink}
          className="group relative py-20 px-6 flex flex-col items-center justify-center text-center gap-4 cursor-pointer transition-all duration-300 hover:bg-blue-700/90 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 p-3 bg-white/20 rounded-full flex items-center justify-center">
              <img
                src={data.rightImage}
                alt={data.rightTitle}
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">{data.rightTitle}</h3>
              <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                {data.rightDesc}
              </p>
            </div>
            <div className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white/90 group-hover:text-white">
              <span>{data.rightCta}</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
