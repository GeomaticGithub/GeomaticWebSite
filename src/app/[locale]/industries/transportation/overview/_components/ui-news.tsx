"use client";
import type { PetroleumOverviewT } from "../constants";
import Link from "next/link";
import Image from "next/image";

export default function NewsEvents({
  data,
}: {
  data: NonNullable<PetroleumOverviewT["news"]>;
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
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-16 md:py-20">
        <h2 className="text-4xl font-semibold text-white">{data.title}</h2>
        <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {data.cards.map((c, i) => (
            <Link
              key={i}
              href={c.href}
              className="group bg-white hover:ring-black/10"
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
                <h3 className="mt-2 text-sm font-semibold text-black">
                  {c.title}
                </h3>
                <p className="mt-2 line-clamp-3 text-sm text-neutral-600">
                  {c.blurb}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
