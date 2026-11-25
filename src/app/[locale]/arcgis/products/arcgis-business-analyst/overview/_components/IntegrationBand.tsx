import Image from "next/image";
import type { BAOverviewMessages } from "../constants";
import Link from "next/link";

export default function IntegrationBand({
  data,
}: {
  data: BAOverviewMessages["integration"];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="bg-[#0d79b5] text-white p-8 h-full flex flex-col justify-center">
          <div className="max-w-lg mx-auto flex flex-col items-start">
            <h3 className="text-2xl font-semibold">{data.title}</h3>
            <p className="mt-3 text-white/95">{data.desc}</p>
            <Link
              href={data.ctaUrl}
              className="mt-6 bg-transparent px-4 py-2 ring-1 ring-white/30 hover:bg-white/20"
            >
              {data.ctaLabel}
            </Link>
          </div>
        </div>
        <div className="relative h-[360px] md:h-[480px] lg:h-[800px]">
          <Image src={data.image} alt="" fill className="object-contain" />
        </div>
      </div>
    </section>
  );
}
