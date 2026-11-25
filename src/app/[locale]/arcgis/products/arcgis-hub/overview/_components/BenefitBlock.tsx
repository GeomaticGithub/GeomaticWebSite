import Image from "next/image";
import type { HubOverviewMessages } from "../constants";

export default function BenefitBlock({
  block,
}: {
  block: HubOverviewMessages["benefits"]["blocks"][number];
}) {
  const left = (
    <div className="relative h-[400px] md:h-[480px] lg:h-[600px]">
      <Image src={block.image} alt="" fill className="object-cover" />
      <div className="absolute inset-0 ring-1 ring-black/5" />
    </div>
  );

  const right = (
    <div className="flex flex-col justify-center">
      <h4 className="text-4xl font-semibold">{block.title}</h4>
      <p className="mt-3 leading-relaxed">{block.desc}</p>
      {block.ctaLabel ? (
        <button className="mt-4 w-fit rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">
          {block.ctaLabel}
        </button>
      ) : null}
    </div>
  );

  return (
    <div
      className={`grid grid-cols-1 gap-8 lg:grid-cols-2 bg-gray-100 text-black ${
        block.side === "image-right" ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {left}
      {right}
    </div>
  );
}
