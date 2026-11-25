import Image from "next/image";
import Link from "next/link";
import type { MissionMessages } from "../constants";

export default function BenefitsCta({
  data,
}: {
  data: MissionMessages["cta"];
}) {
  return (
    <section className="bg-[#1f1b2e] text-white">
      <div className="relative mx-auto px-6 grid gap-8 lg:grid-cols-2 items-center">
        <div className="absolute inset-0 bg-[#6b21a8] [clip-path:polygon(0_20%,100%_60%,100%_0%,0_0%)]"></div>
        <div className="px-36" >
          <h3 className="text-2xl md:text-3xl font-semibold">{data.heading}</h3>
          <p className="mt-2 text-white/90">{data.desc}</p>
          {data.button && (
            <Link
              href={data.button.href}
              className="mt-6 inline-flex bg-transparent border px-4 py-[4px] text-white hover:bg-white/20"
            >
              {data.button.label}
            </Link>
          )}
        </div>
        <div className="relative h-[900px]">
          <Image src={data.image} alt="" fill className="object-contain" />
        </div>
      </div>
    </section>
  );
}
