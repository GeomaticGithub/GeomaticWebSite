import type { OverviewMessages } from "../constants";

export default function CrossPlatformStrip({ cross }: { cross: OverviewMessages["crossPlatform"] }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-14 border-t">
        <h5 className="text-center text-xl md:text-2xl font-semibold text-gray-900 mb-6">
          {cross.title}
        </h5>
        <div className="flex flex-wrap items-center justify-center gap-4 text-blue-700">
          {cross.categories.map((c, i) => (
            <span key={`${c}-${i}`} className="underline">
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
