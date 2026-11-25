import Image from "next/image";
import type { ExcaliburMessages } from "../constants";

export default function Workflow({
  data,
}: {
  data: ExcaliburMessages["workflow"];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 pt-12 text-center">
        <h3 className="text-2xl md:text-4xl font-semibold text-gray-900">
          {data.title}
        </h3>
        <div className="mt-2" >
          <p className="text-gray-600 w-1/2 mx-auto">{data.subtitle}</p>
        </div>
        <div className="relative mt-8 h-[600px] overflow-hidden">
          <Image src={data.image} alt="" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
