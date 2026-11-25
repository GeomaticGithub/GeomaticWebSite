import Image from "next/image";
import type { AnalyzeMsgs } from "../constants";

export default function LearnLocation({
  block,
}: {
  block: AnalyzeMsgs["learnLocation"];
}) {
  return (
    // <section className="bg-white">
    //   <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2 items-center">
    //     <div>
    //       <h3 className="text-2xl font-semibold text-gray-900 mb-3">
    //         {block.title}
    //       </h3>
    //       <ul className="list-disc pl-5 space-y-2 text-gray-700">
    //         {block.bullets.map((b, i) => <li key={i}>{b}</li>)}
    //       </ul>
    //     </div>
    //     <div className="relative h-[320px]">
    //       <Image src={block.photoRight} alt={block.photoAlt} fill className="object-cover rounded-md" />
    //     </div>
    //   </div>
    // </section>

    <section>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
        <div className="p-8 flex flex-col justify-center items-center">
          <div className="w-4/5">
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              {block.title}
            </h3>
            <p className="mb-4">{block.desc}</p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {block.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* image (right) - takes other half of viewport */}
        <div className="flex items-center justify-center px-6 py-14">
          <Image
            src={block.photoRight}
            alt=""
            width={800}
            height={600}
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
}
