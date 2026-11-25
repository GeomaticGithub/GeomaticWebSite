import Image from "next/image";
import Link from "next/link";
import type { EnterpriseOverviewMessages } from "../constants";

export default function HowItWorks({ how }: { how: EnterpriseOverviewMessages["howItWorks"] }) {
  return (
    <section className="bg-[#101010] text-white">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 md:grid-cols-2 gap-0">
        <div className="divide-y divide-white/5">
          {how.rows.map((s, i) => (
            <div key={i} className="p-20">
              <h3 className="text-white font-semibold">{s.title}</h3>
              <p className="mt-2 text-white/80 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="relative h-[520px] md:h-auto">
          <Image src={how.graphic} alt={how.graphicAlt} fill className="object-contain" />
        </div>
      </div>
    </section>
  );
}
