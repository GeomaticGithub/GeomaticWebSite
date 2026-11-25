import Image from "next/image";
import type { UrbanOverviewMessages } from "../constants";
import Link from "next/link";

export default function CenterVisual({
  data,
}: {
  data: UrbanOverviewMessages["centerVisual"];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1200px] px-6 py-12 text-center">
        <div className="flex flex-col gap-3" >
          <h2 className="text-xl md:text-3xl font-semibold text-gray-900">{data.title}</h2>
          <p className="text-gray-900">{data.desc}</p>
          <Link
            href={data.ctaLink}
            className="text-gray-900 w-fit mx-auto border border-black px-2 py-1"
          >{data.ctaLabel}</Link>
        </div>
        <div className="relative mx-auto h-[300px] md:h-[500px] max-w-[780px] bg-red-100">
          <Image src={data.image} alt="" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
