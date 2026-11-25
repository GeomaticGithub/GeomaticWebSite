import { CommonText } from "@/i18n/useCommon";
import Image from "next/image";
import Link from "next/link";
import type { DevOverviewMessages } from "../constants";

export default function Resources({
  data,
}: {
  data: DevOverviewMessages["resources"];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 mb-6">
        <h3 className="text-center text-2xl font-semibold text-gray-900 py-6">
          {data.heading}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
          {data.tiles.map((t, i) => (
            <Link
              key={i}
              href={t.href}
              className="group rounded-lg border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Image Section - Top */}
              <div className="relative h-48 w-full bg-gray-50">
                <Image
                  src={t.icon}
                  alt={t.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content Section - Bottom */}
              <div className="p-5">
                <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {t.title}
                </h4>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {t.desc}
                </p>
                <div className="mt-3 inline-flex items-center text-blue-600 text-sm font-medium">
                  <CommonText k="learnMore" />
                  <svg
                    className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform"
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
          ))}
        </div>
      </div>
    </section>
  );
}
