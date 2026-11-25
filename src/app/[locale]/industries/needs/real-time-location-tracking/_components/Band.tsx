import type { PerfMonPageT } from "../constants";

export default function Band({
  data,
}: {
  data: NonNullable<PerfMonPageT["band"]>;
}) {
  return (
    <section className="bg-neutral-900 text-white">
      <div className="mx-auto max-w-[1200px] px-6 py-10">
        <h2 className="text-2xl md:text-3xl font-semibold">{data.title}</h2>
        <p className="mt-3 text-white/90 leading-relaxed">{data.body}</p>
      </div>
    </section>
  );
}
