import Image from "next/image";
import type { OfficeMessages } from "../constants";

export default function FeatureBlock({ data }: { data: OfficeMessages["addIntelligence"] }) {
  return (
    <section className="">
      <div className="text-black" >
        <div className="mx-auto max-w-[1440px] px-6 py-12">
          <h2 className="text-2xl md:text-5xl text-center">{data.title}</h2>
        </div>
      </div>
      <div className="bg-gray-900 text-white" >
        <div className="mx-auto max-w-[1440px] px-6 py-12">
          <div className="mt-8 grid gap-8 lg:grid-cols-2 items-center">
            <div className="relative h-[400px]">
              <Image src={data.image} alt="" fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-3" >
              <h1 className="text-3xl font-bold">{data.title}</h1>
              <p className="text-white/90">{data.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
