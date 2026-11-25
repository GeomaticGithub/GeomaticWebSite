import Image from "next/image";
import type { AnalyzeMsgs } from "../constants";

export default function OptimalRoutes({
  block,
}: {
  block: AnalyzeMsgs["routes"];
}) {
  return (
    <section className="bg-white">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
        {/* image (left) - takes full half of viewport */}
        <div className="flex items-center justify-center px-6 py-14">
          <Image
            src={block.photoLeft}
            alt=""
            width={800}
            height={600}
            className="w-full h-auto"
          />
        </div>

        {/* text (right) - takes other half of viewport */}
        <div className="bg-transparent p-10 flex flex-col justify-center items-center ">
          <div className="w-4/5">
            <h2 className=" text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
              {block.title}
            </h2>
            <p className="mb-4">{block.desc}</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {block.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
