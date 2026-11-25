import Image from "next/image";
import type { WhatIsGisMessages } from "../constants";

export default function HowWorks({ data }: { data: WhatIsGisMessages["works"] }) {
  return (
    <section className="bg-white">
      <div className="flex flex-col gap-4 mx-auto max-w-[1440px] px-6 py-12 pb-24">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
          {data.title}
        </h3>
        <p className="text-gray-700 w-1/2">{data.intro}</p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {data.cards.map((c, i) => (
            <article key={i} className="text-gray-900">
              <div className="relative h-[400px]">
                <Image src={c.image} alt="" fill className="object-contain" />
              </div>
              <h4 className="mt-3 lg:text-xl font-semibold">{c.title}</h4>
              <p className="mt-1 text-gray-700 text-sm">{c.body}</p>
              <a
                href={c.href}
                className="mt-2 inline-flex items-center text-sky-700 hover:text-sky-900 underline"
              >
                {c.ctaText}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
