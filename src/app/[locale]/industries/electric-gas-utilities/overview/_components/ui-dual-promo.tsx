"use client";
import type { DualPromoT } from "../constants";
import Link from "next/link";

export default function DualPromo({ data }: { data: DualPromoT }) {
  return (
    <section className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 grid gap-8 md:grid-cols-2">
        <div className="rounded-2xl bg-neutral-800 p-6 ring-1 ring-white/10">
          <h3 className="text-xl font-semibold">{data.SpacialAnalysisTitle}</h3>
          <p className="mt-3 text-neutral-300">{data.SpacialAnalysisDesc}</p>
          <Link
            href={data.SpacialAnalysisHref}
            className="mt-6 inline-flex rounded-md bg-white px-4 py-2 text-neutral-900"
          >
            {data.SpacialAnalysisCta}
          </Link>
        </div>
        <div className="rounded-2xl bg-neutral-800 p-6 ring-1 ring-white/10">
          <h3 className="text-xl font-semibold">{data.blogTitle}</h3>
          <p className="mt-3 text-neutral-300">{data.blogDesc}</p>
          <Link
            href={data.blogHref}
            className="mt-6 inline-flex rounded-md bg-white px-4 py-2 text-neutral-900"
          >
            {data.blogCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
