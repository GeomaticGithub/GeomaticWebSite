import Image from "next/image";
import type { PerfMonPageT } from "../constants";

export default function RelatedNeeds({
  data,
}: {
  data: PerfMonPageT["related"];
}) {
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10">
        <Image
          src={data.bgGraphic}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="mx-auto max-w-[1440px] px-6 py-10 pb-16 flex flex-col gap-16">
        <h3 className="text-xl md:text-3xl font-semibold text-gray-900 pt-2">
          {data.title}
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {data.items.map((n, i) => (
            <a
              key={i}
              href={n.href}
              className="rounded border-2 border-gray-200 bg-white p-4 py-8 shadow-sm hover:border-blue-400"
            >
              <Image
                src={n.icon}
                alt={n.title}
                width={50}
                height={50}
                className="mb-4"
              />
              <div className="font-semibold text-gray-900 text-xl">
                {n.title}
              </div>
              <p className="mt-1 text-sm text-gray-700">{n.body}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
