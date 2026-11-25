import Image from "next/image";
import type { ExcaliburMessages } from "../constants";

export default function FeatureIcons({
  data,
}: {
  data: ExcaliburMessages["features"];
}) {
  return (
    <section className="bg-[#2e2e2e]">
      <div className=" flex flex-col gap-4 mx-auto max-w-[1440px] px-6 py-16 text-center text-white">
        <h3 className="text-2xl md:text-3xl font-semibold">{data.title}</h3>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-8">
          {data.items.map((f, i) => (
            <div key={i} className="space-y-2">
              <Image
                src={f.icon}
                alt={f.title}
                width={48}
                height={48}
                className="mx-auto"
              />
              <div className="text-lg font-semibold">{f.title}</div>
              <p className="text-sm text-white/85">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
