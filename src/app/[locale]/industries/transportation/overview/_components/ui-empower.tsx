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
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:py-16">
        {data.title && <h2 className="text-3xl font-semibold">{data.title}</h2>}
        {data.paragraph && (
          <p className="mt-2 text-neutral-700">{data.paragraph}</p>
        )}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((it, i) => (
            <div key={i} className="py-6">
              {it.icon && (
                <Image
                  src={it.icon}
                  alt={it.title}
                  width={50}
                  height={50}
                  className="mb-4"
                />
              )}
              <h3 className="text-xl font-semibold">{it.title}</h3>
              {it.paragraph && (
                <p className="mt-3 text-neutral-700">{it.paragraph}</p>
              )}
              {it.cta && (
                <Link
                  href={it.cta.href}
                  className="mt-4 inline-flex text-sm font-medium text-[#0a5c63]"
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
