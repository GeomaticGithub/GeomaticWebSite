import Image from "next/image";
import type { DevOverviewMessages } from "../constants";

export default function IconStrip({
  items,
}: {
  items: DevOverviewMessages["iconStrip"];
}) {
  return (
    <section className="border-y border-gray-200 bg-[#323232] text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-6">
        {items.map((it, idx) => (
          <div key={idx} className="flex flex-col items-center gap-3">
            <div className="relative h-10 w-10 shrink-0">
              <Image src={it.icon} alt="" fill className="object-contain" />
            </div>
            <div className="flex flex-col items-center gap-2" >
              <div className="font-medium text-lg">{it.title}</div>
              <div className="text-sm">{it.caption}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
