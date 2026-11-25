"use client";
import Image from "next/image";
import type { PetroleumOverviewT } from "../constants";
import Link from "next/link";

export default function Empower({
  data,
}: {
  data: NonNullable<PetroleumOverviewT["empower"]>;
}) {
  return (
    <section className="relative text-white">
      {data.backgroundImage && data.title && (
        <div className="absolute h-full w-full z-0">
          <Image
            src={data.backgroundImage}
            alt={data.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 py-16 md:pb-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {data.items.map((it, i) => (
            <div key={i} className="py-6">
              <h3 className="text-xl font-semibold">{it.title}</h3>
              {it.paragraph && <p className="mt-3">{it.paragraph}</p>}
              {it.cta && (
                <Link
                  href={it.cta.href}
                  className="mt-4 inline-flex text-sm font-medium text-blue-400 hover:underline"
                >
                  {it.cta.label} →
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
