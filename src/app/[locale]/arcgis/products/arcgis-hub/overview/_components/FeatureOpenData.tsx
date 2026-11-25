import Image from "next/image";
import type { HubOverviewMessages } from "../constants";

export default function FeatureOpenData({
  data,
}: {
  data: HubOverviewMessages["openData"];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div className="relative h-[340px] rounded-lg overflow-hidden ring-1 ring-gray-200">
          <Image src={data.image} alt="" fill className="object-cover" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-900">{data.title}</h3>
          <p className="mt-3 text-gray-700 leading-relaxed">{data.desc}</p>
        </div>
      </div>
    </section>
  );
}
