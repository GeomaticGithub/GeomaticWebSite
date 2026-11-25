import Image from "next/image";
import type { SharePointMessages } from "../constants";

export default function FeaturesGrid({
  data,
}: {
  data: SharePointMessages["featuresGrid"];
}) {
  return (
    <section>
      <div className="text-white">
        {data.items.map((f, i) => (
          <div
            key={i}
            className="relative"
            style={{ backgroundColor: f.colorBg }}
          >
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 items-center max-w-[1440px] mx-auto px-6 py-12 lg:py-16 gap-8 lg:gap-12 ${
                i % 2 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative h-[300px] sm:h-[350px] lg:h-[400px] bg-transparent flex flex-col justify-end items-end">
                <div className="h-[250px] sm:h-[300px] lg:h-[350px] w-full relative">
                  <Image src={f.image} alt="" fill className="object-cover" />
                </div>
              </div>
              <div className="text-center lg:text-left px-4 lg:px-8">
                <h3 className="text-2xl sm:text-3xl lg:text-3xl font-semibold mb-4">
                  {f.title}
                </h3>
                <p>
                  {f.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
