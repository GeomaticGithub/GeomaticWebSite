import Image from "next/image";
import type { MarketPageT } from "../constants";

export default function Capabilities({
  data,
}: {
  data: MarketPageT["capabilities"];
}) {
  return (
    <section className="bg-white">
      <div className="flex flex-col gap-2 mx-auto max-w-[1440px] px-6 py-12 pb-24 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 w-1/2 mx-auto">
          {data.title}
        </h3>
        <p className="text-gray-700 w-1/2 mx-auto">{data.blurb}</p>
        <div className="grid gap-10 md:grid-cols-3">
          {data.items.map((c, i) => (
            <article key={i} className="flex flex-col gap-2">
              <div className="relative h-[300px]">
                <Image src={c.image} alt="" fill className="object-contain" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 text-start">
                {c.title}
              </h4>
              <p className="text-gray-700 text-sm text-start">{c.body}</p>
              <a
                href={c.href}
                className="inline-flex text-sky-700 underline hover:text-sky-900"
              >
                {c.cta}
                <span aria-hidden> &rarr;</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
