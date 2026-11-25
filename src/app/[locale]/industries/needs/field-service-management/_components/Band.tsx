import Image from "next/image";
import type { FieldServicePageT } from "../constants";

export default function Band({
  data,
}: {
  data: NonNullable<FieldServicePageT["band"]>;
}) {
  return (
    <section className="bg-gradient-to-r from-indigo-700 via-sky-600 to-blue-600 text-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 py-10 md:grid-cols-[1.1fr_1.3fr]">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">{data.title}</h2>
          <p className="mt-3 text-white/90 leading-relaxed">{data.body}</p>
        </div>
        {data.image ? (
          <div className="relative h-[300px]">
            <Image
              src={data.image}
              alt=""
              fill
              className="object-cover rounded"
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
