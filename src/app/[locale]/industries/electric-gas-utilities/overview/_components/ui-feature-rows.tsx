"use client";
import type { FeatureRowT } from "../constants";

function Row({ r, index }: { r: FeatureRowT; index: number }) {
  // Automatically alternate layout: even index = left, odd index = right
  const isLeft = index % 2 === 0;

  return (
    <section
      className="relative text-white overflow-hidden"
      style={{
        backgroundImage: r.backgroundImage
          ? `url(${r.backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[300px] lg:min-h-[450px]">
          {/* Image Section */}
          <div
            className={`${
              isLeft ? "order-2 lg:order-1" : "order-2 lg:order-2"
            } flex items-end`}
          >
            <div className="relative w-full aspect-video overflow-hidden bg-neutral-800">
              <img
                src={r.image}
                alt={r.imageAlt ?? r.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text Content */}
          <div
            className={`${
              isLeft ? "order-1 lg:order-2" : "order-1 lg:order-1"
            } flex flex-col justify-center`}
          >
            <h3 className="text-xl font-semibold md:text-2xl lg:text-2xl">
              {r.title}
            </h3>
            <p className="mt-4 text-neutral-200 md:text-lg leading-relaxed">
              {r.paragraph}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FeatureRows({ data }: { data: FeatureRowT[] }) {
  return (
    <>
      {data.map((r, i) => (
        <Row key={i} r={r} index={i} />
      ))}
    </>
  );
}
