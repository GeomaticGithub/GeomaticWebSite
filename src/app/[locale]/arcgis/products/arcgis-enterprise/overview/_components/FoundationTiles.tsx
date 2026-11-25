import Link from "next/link";
import Image from "next/image";
import type { EnterpriseOverviewMessages } from "../constants";

// Function to convert Tailwind gradient classes to CSS styles
const getGradientStyle = (bgClass: string) => {
  if (bgClass.includes("from-blue-900 via-blue-800 to-blue-700")) {
    return {
      background: "linear-gradient(to right, #1e3a8a, #1e40af, #1d4ed8)",
    };
  }
  if (bgClass.includes("bg-gradient-to-r from-violet-400 via-violet-500 to-violet-600")) {
    return {
      background: "linear-gradient(to bottom right, #7c3aed, #5b21b6, #3b0764)",
    };
  }
  if (bgClass.includes("bg-gradient-to-r from-green-600 via-green-700 to-green-800")) {
    return {
      background: "linear-gradient(to bottom right, #16a34a, #166534, #052e16)",
    };
  }
  if (bgClass.includes("bg-gradient-to-r from-rose-600 via-rose-700 to-rose-800")) {
    return {
      background: "linear-gradient(to bottom right, #e11d48, #9f1239, #4c0519)",
    };
  }
  return {};
};

export default function FoundationTiles({
  foundation,
}: {
  foundation: EnterpriseOverviewMessages["foundation"];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 h-[800px]">
        <div className="flex flex-col justify-center px-28 h-full">
          <h4 className="text-2xl font-semibold text-gray-900">
            {foundation.heading}
          </h4>
          <p className="mt-3 text-gray-700 max-w-prose">{foundation.blurb}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 h-full">
          {foundation.tiles.map((t, idx) => (
            <Link
              key={idx}
              href={t.hrefUrl}
              className="relative overflow-hidden group h-full"
              style={getGradientStyle(t.bg)}
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
              </div>
              <div className="relative p-6 flex flex-col justify-center h-full gap-4 px-12">
                <Image
                  src={t.icon}
                  alt={t.title}
                  width={40}
                  height={40}
                />
                <div className="text-white text-xl font-semibold">{t.title}</div>
                <div className="text-white text-sm">{t.desc}</div>
                <div className="text-white text-sm underline">{t.hrefText}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
