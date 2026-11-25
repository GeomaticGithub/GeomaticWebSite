import Image from "next/image";
import type { UrbanOverviewMessages } from "../constants";

export default function SplitFeatures({
  data,
}: {
  data: UrbanOverviewMessages["split"];
}) {
  return (
    <section className="text-black">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="relative h-[520px] md:h-auto bg-gradient-to-r from-[#e3f9ff] to-[#bdecfb]">
          <Image
            src={data.leftImage}
            alt={data.leftImageAlt}
            fill
            className="object-contain"
          />
        </div>
        <div className="divide-y divide-white/5">
          {data.features.map((s, i) => (
            <div key={i} className={`flex flex-col px-16 py-24 ${i % 2 !== 0 ? "bg-white" : "bg-gray-50"}`}>
              <img src={s.icon} alt="" className="h-10 w-10" />
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="text-black/80 text-sm leading-relaxed">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
