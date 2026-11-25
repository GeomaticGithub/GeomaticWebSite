import Image from "next/image";
import type { MissionMessages } from "../constants";

export default function Benefits({
  data,
}: {
  data: MissionMessages["benefits"];
}) {
  return (
    <>
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[#6b21a8] [clip-path:polygon(0_0,100%_0,100%_20%,0_60%)]"></div>
        <div className="relative z-10">
          <div className="mx-auto max-w-[1440px] px-6">
            <div className="text-center text-white mb-4 flex flex-col gap-2">
              <h2 className="text-3xl md:text-4xl lg:text-4xl font-semibold">
                {data.heading}
              </h2>
              <p>{data.desc}</p>
            </div>
            <div className="mx-auto max-w-5xl">
              <div className="relative h-[300px] lg:h-[500px] w-full overflow-hidden">
                <Image
                  src={data.image}
                  alt=""
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lg:py-16">
        <div className="mx-auto max-w-[1440px] px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {data.items.map((b, i) => (
              <div key={i} className="flex flex-col gap-2 bg-white rounded-lg">
                {b.icon && (
                  <Image
                    src={b.icon}
                    alt=""
                    width={48}
                    height={48}
                    className=""
                  />
                )}
                <div className="font-bold text-xl text-gray-900">{b.title}</div>
                <p className="text-gray-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
