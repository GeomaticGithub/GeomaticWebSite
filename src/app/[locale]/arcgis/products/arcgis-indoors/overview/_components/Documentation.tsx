import Link from "next/link";
import type { IndoorsMessages } from "../constants";

export default function Documentation({
  data,
}: {
  data: IndoorsMessages["docs"];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <h3 className="text-center text-2xl md:text-3xl font-semibold text-gray-900">
          {data.heading}
        </h3>
        <p className="text-center text-gray-900">
          {data.desc}
        </p>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.cards.map((c, i) => (
            <Link
              href={c.link}
              key={i}
              className="border border-gray-200 p-4 pb-14 hover:scale-105 transition-transform"
            >
              <div className="font-semibold">{c.title}</div>
              {/* <div className="text-blue-700 text-sm mt-1">{c.linkLabel}</div> */}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
