import Image from "next/image";
import Link from "next/link";
import type { ShareCollabMsgs } from "../constants";

export default function DiscoverCapabilities({
  discover,
}: {
  discover: ShareCollabMsgs["discover"];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full">
        <h4 className="text-center text-gray-900 text-xl md:text-2xl font-semibold my-8">
          {discover.heading}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {discover.cards.map((c, i) => (
            <Link
              key={`${c.title}-${i}`}
              href={c.href}
              className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={c.bgImage}
                  alt={c.bgAlt}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/45 transition-colors" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center p-4 ">
                <div className="text-white flex flex-col items-center justify-center gap-2">
                  <div className="font-semibold text-xl">{c.title}</div>
                  <div className="text-sm text-white/90">{c.desc}</div>
                  <div className="mt-1 underline">{c.linkText}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
