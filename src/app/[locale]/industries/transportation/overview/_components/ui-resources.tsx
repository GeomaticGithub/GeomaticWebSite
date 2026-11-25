"use client";
import type { PetroleumOverviewT } from "../constants";
import Link from "next/link";
import Image from "next/image";

export default function Resources({
  data,
}: {
  data: NonNullable<PetroleumOverviewT["resources"]>;
}) {
  return (
    <section
      className="relative text-white overflow-hidden"
      style={{
        backgroundImage: data.backgroundImage
          ? `url(${data.backgroundImage})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-16 md:py-20">
        <h2 className="text-4xl font-semibold text-black">{data.title}</h2>
        <p className="mt-4 text-black">{data.description}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.cards.map((c, i) => (
            <Link
              key={i}
              href={c.href}
              className="group bg-white ring-1 ring-black/10 hover:ring-black/20"
            >
              <div className="relative h-40 w-full overflow-hidden bg-neutral-200">
                {c.image && (
                  <Image
                    src={c.image}
                    alt={c.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                )}
              </div>
              <div className="p-5">
                <h3 className="mt-2 text-lg font-semibold text-black">
                  {c.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-neutral-600">
                  {c.blurb}
                </p>
                {c.meta && (
                  <p className="mt-3 text-xs text-neutral-500">{c.meta}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
