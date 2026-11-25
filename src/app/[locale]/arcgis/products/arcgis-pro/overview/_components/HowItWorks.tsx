import Image from "next/image";
import type { ProOverviewMessages } from "../constants";

export default function HowItWorks({ data }: { data: ProOverviewMessages["howItWorks"] }) {
  return (
    <section className="bg-[#101010] text-white">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 md:grid-cols-2 gap-0">
        <div className="divide-y divide-white/5">
          {data.steps.map((s, i) => (
            <div key={i} className="p-20">
              <h3 className="text-white font-semibold">{s.title}</h3>
              <p className="mt-2 text-white/80 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="relative h-[520px] md:h-auto">
          <Image src={data.illustration} alt={data.illustrationAlt} fill className="object-contain" />
        </div>
      </div>
    </section>
  );
}
