import Image from "next/image";
import type { InsightsMessages } from "../constants";

export default function HowItWorks({ data }: { data: InsightsMessages["how"] }) {
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col gap-14 mx-auto max-w-[1200px] px-6 py-12 pb-28">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center">
          {data.heading}
        </h3>
        <div className="grid gap-8 md:grid-cols-3">
          {data.steps.map((s, i) => (
            <div key={i} className="flex flex-col gap-2">
              <Image
                src={s.icon}
                alt=""
                width={48}
                height={48}
                className=""
              />
              <div className="text-xl font-semibold text-gray-900">{i + 1}. {s.title}</div>
              <p className="text-sm text-gray-700">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
