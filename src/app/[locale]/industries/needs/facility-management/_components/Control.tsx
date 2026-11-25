import Image from "next/image";
import type { FacilityPageT } from "../constants";

export default function Control({ data }: { data: FacilityPageT["control"] }) {
  return (
    <section className="bg-neutral-900 text-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 py-12 md:grid-cols-[1.1fr_1.3fr]">
        {data.image ? (
          <div className="relative h-[320px] md:h-[360px] order-2 md:order-1">
            <Image src={data.image} alt="" fill className="object-cover rounded" />
          </div>
        ) : null}
        <div className="order-1 md:order-2">
          <h2 className="text-2xl md:text-3xl font-semibold">{data.title}</h2>
          <p className="mt-3 text-white/85 leading-relaxed">{data.body}</p>
        </div>
      </div>
    </section>
  );
}
