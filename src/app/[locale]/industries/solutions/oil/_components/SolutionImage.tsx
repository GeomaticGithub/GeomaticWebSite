import Image from "next/image";
import type { AssetPageT } from "../constants";

export default function SolutionImage({
  data,
}: {
  data: AssetPageT["solutionImage"];
}) {
  return (
    <section className="">
      <div className="mx-auto max-w-[1200px] flex justify-center pb-16">
        <div className="relative w-full max-w-[800px] h-[500px] md:h-[600px] lg:h-[500px]">
          <Image
            src={data.image}
            alt={data.alt}
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
