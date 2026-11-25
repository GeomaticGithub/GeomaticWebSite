import Image from "next/image";
import type { PowerBIMessages } from "../constants";

export default function BenefitBlock({
  block,
}: {
  block: PowerBIMessages["feature"]["blocks"][number];
}) {
  const left = (
    <div className="relative h-[400px] md:h-[450px] lg:h-[600px]">
      <Image src={block.image} alt="" fill className="object-cover" />
    </div>
  );

  const right = (
    <div className="flex flex-col justify-center">
      <h4 className="text-4xl font-semibold">{block.title}</h4>
      <p className="mt-3 leading-relaxed">{block.desc}</p>
      {/* {block.ctaLabel ? (
        <button className="mt-4 w-fit rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">
          {block.ctaLabel}
        </button>
      ) : null} */}
    </div>
  );

  return (
    <div
      className={`grid grid-cols-1 gap-8 lg:grid-cols-2 bg-[#323232] text-white ${
        block.side === "image-right" ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {left}
      {right}
    </div>
  );
}
