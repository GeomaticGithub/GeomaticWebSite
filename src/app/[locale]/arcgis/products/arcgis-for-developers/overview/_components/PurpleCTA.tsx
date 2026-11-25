import Link from "next/link";
import type { DevOverviewMessages } from "../constants";

export default function PurpleCTA({
  data,
}: {
  data: DevOverviewMessages["purpleCta"];
}) {
  return (
    <section className="relative overflow-hidden py-12">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#7c3aed] to-[#4338ca]" />
      <div className="mx-auto max-w-[1200px] px-6 py-16 text-white text-center">
        <h3 className="text-2xl md:text-3xl font-semibold">{data.title}</h3>
        <p className="mt-3 opacity-90 max-w-2xl mx-auto">{data.desc}</p>
        <Link
          href={data.href}
          className="mt-6 inline-block bg-transparent px-4 py-2 ring-1 ring-white/30 hover:bg-white/20 transition"
        >
          {data.ctaLabel}
        </Link>
      </div>
    </section>
  );
}
