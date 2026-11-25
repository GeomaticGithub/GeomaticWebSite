import Image from "next/image";
import type { AssetPageT } from "../constants";

export default function DualImages({
  data,
}: {
  data: AssetPageT["dualImages"];
}) {
  return (
    <section className="py-16">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          <div className="group relative h-[350px] md:h-[450px] lg:h-[500px]">
            <Image
              src={data.image1}
              alt={data.alt1 || "Building Management Image 1"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          
          <div className="group relative h-[350px] md:h-[450px] lg:h-[500px]">
            <Image
              src={data.image2}
              alt={data.alt2 || "Building Management Image 2"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}