import Image from "next/image";
import type { AssetPageT } from "../constants";

export default function Intro({ data }: { data: AssetPageT["intro"] }) {
  return (
    <section className="relative text-white border-b">
      <div className="absolute inset-0 z-0">
        <Image
          src={data.bgGraphic}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="flex flex-col items-center gap-2 mx-auto max-w-[1440px] px-6 py-32 relative z-10">
        <h2 className="text-2xl md:text-3xl font-semibold">{data.title}</h2>
        <h3 className="text-lg md:text-xl text-white/60">
          {data.subTitle}
        </h3>
        <p className="max-w-3xl text-center">{data.paragraph}</p>
      </div>
    </section>
  );
}
