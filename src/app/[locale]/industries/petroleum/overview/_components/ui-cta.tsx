"use client";
import type { CtaT } from "../constants";
import Link from "next/link";

export default function CtaBand({ data }: { data: CtaT }) {
  return (
    <section className="bg-[#2B2B2B] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold md:text-3xl">{data.title}</h2>
        <Link
          href={data.ctaHref}
          className="mt-6 inline-flex bg-[#009AF2] px-5 py-2  text-neutral-900"
        >
          {data.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
