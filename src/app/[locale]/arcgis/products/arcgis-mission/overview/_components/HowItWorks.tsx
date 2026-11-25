import Image from "next/image";
import type { MissionMessages } from "../constants";

export default function HowItWorks({ data }: { data: MissionMessages["how"] }) {
  return (
    <section className="bg-gray-100 text-black">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 ">
        <div className="relative h-[520px] md:h-auto">
          <Image
            src={data.illustration}
            alt={data.illustrationAlt}
            fill
            className="object-contain "
          />
        </div>
        <div className="divide-y divide-white/5">
          {data.steps.map((s, i) => (
            <div key={i} className={`flex flex-col p-20 py-28 ${i % 2 ? "" : "bg-white/50"}`}>
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="leading-relaxed w-1/2">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
