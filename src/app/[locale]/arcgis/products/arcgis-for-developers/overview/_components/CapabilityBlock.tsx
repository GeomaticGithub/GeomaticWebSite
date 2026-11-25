import Image from "next/image";
import type { DevOverviewMessages } from "../constants";

export default function CapabilityBlock({
  block,
  parent,
}: {
  block: DevOverviewMessages["capabilities"]["blocks"][number];
  parent?: "capabilities" | "tabCapabilities";
}) {
  const left = (
    <div className="relative h-[400px] md:h-[480px] lg:h-[520px]">
      <Image
        src={block.image}
        alt=""
        fill
        className="object-cover rounded-md"
      />
      <div className="absolute inset-0 ring-1 ring-black/5 rounded-md" />
    </div>
  );

  const right = (
    <div className="flex flex-col justify-center px-6 py-6 md:px-32">
      <h4 className="text-xl font-semibold text-gray-900">{block.title}</h4>
      <p className=" text-gray-900">{block.desc}</p>
      {block.bullets ? (
        <ul className="mt-3 space-y-1 text-gray-700 text-sm leading-relaxed list-disc pl-5">
          {block.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      ) : null}
      {block.footnote ? (
        <p className="mt-3 text-xs text-gray-500">{block.footnote}</p>
      ) : null}
      {block.ctaLabel ? (
        <button className="mt-4 w-fit rounded-md border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50">
          {block.ctaLabel}
        </button>
      ) : null}
    </div>
  );

  return (
    <div
      className={`grid grid-cols-1 gap-8 lg:grid-cols-2 bg-gray-100 ${
        block.side === "image-right" ? "lg:[&>*:first-child]:order-2" : ""
      } ${
        parent === "capabilities"
          ? "w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] px-6"
          : ""
      }`}
    >
      {left}
      {right}
    </div>
  );
}
