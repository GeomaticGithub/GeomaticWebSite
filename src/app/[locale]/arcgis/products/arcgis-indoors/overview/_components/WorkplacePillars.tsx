import Image from "next/image";
import type { IndoorsMessages } from "../constants";

export default function WorkplacePillars({
  data,
}: {
  data: IndoorsMessages["workplace"];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 w-1/2 mx-auto">
          {data.heading}
        </h2>
        <p className="mt-2 text-center text-gray-700 w-1/2 mx-auto">
          {data.subheading}
        </p>

        <div className="mt-8">
          <div className="relative h-[500px] w-full">
            <Image src={data.image} alt="" fill className="object-cover" />
          </div>
        </div>
      </div>

      <div className="bg-[#323232] text-white" >
        <div className="mx-auto max-w-[1440px] px-6 py-20 pb-28">
          <div className="grid gap-8 md:grid-cols-4">
            {data.pillars.map((p, i) => (
              <div key={i} className="flex flex-col gap-2">
                <div className="text-xl font-semibold">{p.title}</div>
                <p className="text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
