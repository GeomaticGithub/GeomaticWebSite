import Image from "next/image";
import type { LogisticsPageT } from "../constants";

export default function Articles({
  data,
}: {
  data: LogisticsPageT["articles"];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-12 flex flex-col gap-20">
        <h3 className="text-2xl md:text-4xl font-semibold text-gray-900 text-center">
          {data.title}
        </h3>
        <div className="grid gap-8 md:grid-cols-3">
          {data.items.map((a, i) => (
            <a
              key={i}
              href={a.href}
              className="group border-2 border-gray-200 hover:border-blue-400 transition-colors"
            >
              <div className="relative h-[250px]">
                <Image
                  src={a.image}
                  alt=""
                  fill
                  className="object-cover rounded-t"
                />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <div className="uppercase tracking-wide text-gray-500">
                  {a.tag}
                </div>
                <div className="text-xl font-semibold text-gray-900 group-hover:text-sky-800">
                  {a.title}
                </div>
                <div className="text-gray-500">{a.source}</div>
                <p className="text-gray-700">{a.excerpt}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
