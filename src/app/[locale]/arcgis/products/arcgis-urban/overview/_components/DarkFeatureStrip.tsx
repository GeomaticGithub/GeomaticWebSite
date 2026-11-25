import Image from "next/image";
import type { UrbanOverviewMessages } from "../constants";

export default function DarkFeatureStrip({
  items,
}: {
  items: UrbanOverviewMessages["darkStrip"];
}) {
  return (
    <section className="bg-[#222]">
      <div className="mx-auto max-w-[1440px] px-6 py-32 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <div key={i} className="text-white flex flex-col gap-2">
            <div className="relative h-48 w-full overflow-hidden ring-1 ring-white/10">
              <Image src={it.image} alt="" fill className="object-cover" />
            </div>
            <div className="mt-3 text-xl font-medium">{it.title}</div>
            <div className="text-sm text-white/80">{it.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
