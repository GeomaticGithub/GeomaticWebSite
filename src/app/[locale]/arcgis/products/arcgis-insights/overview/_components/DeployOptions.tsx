import Image from "next/image";
import Link from "next/link";
import type { InsightsMessages } from "../constants";

export default function DeployOptions({
  data,
}: {
  data: InsightsMessages["deploy"];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Left Side - Heading (1 part) */}
          <div className="lg:col-span-1 flex flex-col gap-4 justify-center h-full w-3/4 mx-auto">
            <h3 className="text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-900 leading-tight">
              {data.heading}
            </h3>
            <h3 className="text-gray-900 leading-tight">{data.desc}</h3>
          </div>

          {/* Right Side - Cards with Backdrop (2 parts) */}
          <div className="lg:col-span-2 relative h-full">
            {/* Backdrop Image */}
            <div className="absolute inset-0 z-10 overflow-hidden">
              <Image
                src={data.backdropImage}
                alt=""
                fill
                className="object-cover"
              />
            </div>

            {/* Cards Grid */}
            <div className="relative z-10 grid gap-6 sm:grid-cols-2 p-8">
              {data.options.map((o, i) => (
                <div
                  key={i}
                  className="bg-white/90 backdrop-blur-sm p-10 pb-32 shadow-lg border border-white/20 hover:bg-white/95 transition-all duration-300"
                >
                  <div className="font-semibold text-gray-900 text-2xl mb-3">
                    {o.title}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {o.desc}
                  </p>
                  <Link
                    href={o.cta.href}
                    className="inline-flex items-center border px-2 py-[4px] border-orange-600 text-orange-600 hover:text-orange-700 font-semibold text-sm group"
                  >
                    {o.cta.label}
                    <svg
                      className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
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
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
