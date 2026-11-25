"use client";
import type { StrengthenT } from "../constants";

export default function StrengthenBand({ data }: { data: StrengthenT }) {
  return (
    <section className="bg-[#24096A] text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16">
        <h2 className="text-2xl md:text-5xl text-center">{data.title}</h2>
        <p className="mt-8 text-neutral-200 md:text-lg text-center w-4/5 mx-auto">
          {data.paragraph}
        </p>
      </div>
    </section>
  );
}
