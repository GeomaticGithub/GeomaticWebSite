"use client";
import type { IntroT } from "../constants";

export default function Intro({ data }: { data: IntroT }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-14 md:py-16">
        <p className="max-w-4xl text-neutral-700 md:text-lg">{data.paragraph}</p>
      </div>
    </section>
  );
}