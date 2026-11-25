import Image from "next/image";
import type { PerfMonPageT } from "../constants";

export default function Opportunities({
  data,
}: {
  data: PerfMonPageT["opportunities"];
}) {
  return (
    <section className="bg-[#F3F3F3]">
      <div className="mx-auto grid items-center gap-10 md:grid-cols-2">
        {data.image ? (
          <div className="relative h-[550px]">
            <Image
              src={data.image}
              alt=""
              fill
              className="object-cover rounded"
            />
          </div>
        ) : null}
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {data.title}
          </h3>
          <p className="mt-2 text-gray-700">{data.intro}</p>
          <ul className="mt-4 space-y-2 text-gray-800">
            {data.bullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full bg-sky-600" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
