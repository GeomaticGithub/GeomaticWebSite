"use client";
import Image from "next/image";
import type { PetroleumOverviewT } from "../constants";
import Link from "next/link";

export default function Empower({
  data,
}: {
  data: PetroleumOverviewT["empower"];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:py-20">
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-3">
          {data.items.map((it, i) => (
            <div key={i} className="py-6">
              {it.icon && (
                <Image
                  src={it.icon}
                  alt={it.title}
                  width={64}
                  height={64}
                  className="mb-4"
                />
              )}
              <h3 className="text-xl font-semibold">{it.title}</h3>
              <p className="mt-3 text-neutral-700">{it.paragraph}</p>
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
