import Image from "next/image";
import Link from "next/link";
import type { AssetPageT } from "../constants";

export default function PerformanceVGIS({
  data,
}: {
  data: AssetPageT["performanceGDI"];
}) {
  return (
    <section>
      <div className="mx-auto grid items-center md:grid-cols-2 py-16 border-b">
        <div className="relative h-[450px] group">
          <Image src={data.image} alt="" fill className="object-cover" />
          <Link
            href={(data as any).documentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:scale-110 transition-transform duration-200">
              <svg
                className="w-5 h-5 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-gray-500 uppercase tracking-widest">
            {data.eyebrow}
          </p>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {data.title}
          </h3>
          <p className="text-gray-700 text-center w-3/4">{data.intro}</p>
        </div>
      </div>
    </section>
  );
}
