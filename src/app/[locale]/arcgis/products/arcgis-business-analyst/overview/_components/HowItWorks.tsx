import Image from "next/image";
import type { BAOverviewMessages } from "../constants";

export default function HowItWorks({ data }: { data: BAOverviewMessages["how"] }) {
  return (
    <section className="bg-[#0d79b5]">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <h2 className="text-center text-white text-2xl md:text-3xl font-semibold">
          {data.title}
        </h2>
        <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.steps.map((s, i) => (
            <div key={i} className="text-white flex flex-col gap-2">
              <div className="relative h-52 w-full overflow-hidden">
                <Image src={s.image} alt="" fill className="object-cover" />
              </div>
              <div className="mt-3 text-xl font-semibold">{s.title}</div>
              <div className="text-sm text-white/90">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
