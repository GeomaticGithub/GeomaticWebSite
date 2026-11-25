import type { ProOverviewMessages } from "../constants";
import Image from "next/image";
import Link from "next/link";

export default function EcosystemTiles({ eco }: { eco: ProOverviewMessages["ecosystem"] }) {
  return (
    <section className="bg-[#1f1f1f] text-white">
      <div className="items-center mx-auto w-full px-6 py-12">
        <h4 className="text-4xl font-semibold mb-2 text-center">{eco.title}</h4>
        <p className="mb-8 text-center">{eco.desc}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch relative">
          {eco.items.map((it, i) => (
            <div key={i} className="bg-black/80 rounded-md p-6 flex flex-col justify-between z-10 py-32 px-10">
              <div>
                <h5 className="text-xl font-semibold">{it.title}</h5>
                <p className="text-lg text-white/85 mt-2">{it.desc}</p>
              </div>
              <Link href={it.href} className="mt-4 inline-block underline text-blue-300">
                {it.hrefLabel}
              </Link>
            </div>
          ))}
          <Image src={eco.crossImage} alt="" fill className="absolute object-cover z-0" />
        </div>
      </div>
    </section>
  );
}
