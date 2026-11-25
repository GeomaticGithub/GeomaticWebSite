import Image from "next/image";
import type { IndoorsMessages } from "../constants";

export default function HowItWorks({ data }: { data: IndoorsMessages["how"] }) {
  return (
    <section className="text-black">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-0">
        <div className="relative h-[520px] md:h-auto bg-gradient-to-b from-[#eaf5dd] to-[#eaf5dd]">
          <Image
            src={data.illustration}
            alt={data.illustrationAlt}
            fill
            className="object-contain"
          />
        </div>
        <div className="divide-y divide-white/5">
          {data.steps.map((s, i) => (
            <div
              key={i}
              className={`flex flex-col gap-2 p-20 py-28 ${
                i % 2 ? "" : "bg-gray-100"
              }`}
            >
              <h3 className="text-xl font-semibold">{s.title}</h3>
              <p className="leading-relaxed w-3/4">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
