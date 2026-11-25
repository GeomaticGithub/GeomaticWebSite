import Link from "next/link";
import type { UrbanOverviewMessages } from "../constants";

export default function QuickTiles({
  data,
}: {
  data: UrbanOverviewMessages["quickTiles"];
}) {
  return (
    <section className="bg-[#323232] text-white">
      <h2 className="text-4xl font-semibold text-center py-6">{data.title}</h2>
      <div className="mx-auto max-w-[1200px] px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {data.items.map((t, i) => (
          <Link
            href={t.link}
            key={i}
            className="flex flex-col gap-2 border-[0.5px] bg-[#262626] border-gray-600 hover:border-blue-400 p-4 pb-14 cursor-pointer"
          >
            <div className="text-xl font-semibold">{t.title}</div>
            <div className="text-sm">{t.desc}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
