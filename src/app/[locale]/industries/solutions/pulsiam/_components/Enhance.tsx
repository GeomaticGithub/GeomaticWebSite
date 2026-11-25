import Image from "next/image";
import type { AssetPageT } from "../constants";

export default function Enhance({
  data,
}: {
  data: NonNullable<AssetPageT["enhance"]>;
}) {
  return (
    <section className="bg-neutral-900 text-white">
      <div className="mx-auto grid grid-cols-1 gap-8 md:grid-cols-2">
        {data.image ? (
          <div className="relative h-[350px] md:h-[550px] order-2 md:order-1">
            <Image src={data.image} alt="" fill className="object-cover" />
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
