import Image from "next/image";
import type { HubOverviewMessages } from "../constants";

export default function CapabilitiesList({
  data,
}: {
  data: HubOverviewMessages["capabilities"];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-12 pb-24">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
          {data.title}
        </h2>
        <p className="mt-2 text-gray-700">{data.desc}</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.groups.map((g, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <Image
                src={g.icon}
                alt=""
                className="mt-2"
                width={60}
                height={60}
              />
              <div className="font-semibold text-gray-900">{g.title}</div>
              <div className="mt-1 text-sm text-gray-600">{g.desc}</div>
              <ul className="mt-3 space-y-4 text-sm text-gray-700">
                {g.items.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    <span>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
