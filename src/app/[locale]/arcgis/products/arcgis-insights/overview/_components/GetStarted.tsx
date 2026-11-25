import Image from "next/image";
import Link from "next/link";
import type { InsightsMessages } from "../constants";

export default function GetStarted({
  data,
}: {
  data: InsightsMessages["getStarted"];
}) {
  return (
    <section className="bg-[#f97316] relative overflow-hidden">
      <Image
        src="/arcgisInsights/arcgis-insights-banner-bg.jpg"
        alt=""
        fill
        className="absolute inset-0 z-0 object-cover opacity-40"
      />

      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 text-white relative z-20">
        <Link
          href={data?.leftLink || "#"}
          className="group relative py-20 px-6 flex flex-col items-center justify-center text-center gap-4 cursor-pointer transition-all duration-300 hover:bg-orange-600/90 backdrop-blur-sm border-r border-white/10"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 p-3 bg-white/20 rounded-full flex items-center justify-center">
              <Image
                src="/arcgisInsights/chat.svg"
                width={40}
                height={40}
                alt=""
              />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">
                {data?.leftTitle || "Read the blog"}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                {data?.leftDesc ||
                  "Get the latest news on ArcGIS Insights—what's new and what's coming."}
              </p>
            </div>
            <div className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white/90 group-hover:text-white">
              <span>{data?.leftCta || "Visit the blog"}</span>
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

        <Link
          href={data?.rightLink || "#"}
          className="group relative py-20 px-6 flex flex-col items-center justify-center text-center gap-4 cursor-pointer transition-all duration-300 hover:bg-orange-600/90 backdrop-blur-sm"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 p-3 bg-white/20 rounded-full flex items-center justify-center">
              <Image
                src="/arcgisInsights/conversation.svg"
                width={40}
                height={40}
                alt=""
              />
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">
                {data?.rightTitle || "Join the conversation"}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                {data?.rightDesc ||
                  "Give feedback and get ideas from a community of users and experts."}
              </p>
            </div>
            <div className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-white/90 group-hover:text-white">
              <span>{data?.rightCta || "Join community"}</span>
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
