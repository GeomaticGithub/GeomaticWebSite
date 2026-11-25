"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function getCurrentLocaleFromPath(pathname: string): string {
  const seg = pathname.split("/")[1];
  return /^[a-z]{2}-[a-z]{2}$/i.test(seg) ? seg : "en-ma";
}

type Props = {
  data: {
    title: string;
    cards: {
      title: string;
      desc?: string;
      image?: string;
      gradient: string; // e.g., "from-amber-600 to-slate-800"
      link: string;
      cta?: string;
    }[];
  };
};

export default function Community({ data }: Props) {
  const pathname = usePathname();
  const locale = getCurrentLocaleFromPath(pathname);

  return (
    <section className="bg-white">
      <div className="mx-auto">
        {/* Large three-tiles row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          {data.cards.map((c, i) => (
            <Link
              key={i}
              href={c.link.startsWith("http") ? c.link : `/${locale}${c.link}`}
              target={c.link.startsWith("http") ? "_blank" : undefined}
              className="group relative overflow-hidden h-44 md:h-56"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${c.gradient} opacity-85 group-hover:opacity-100 transition`}
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10 flex h-full items-center justify-center">
                <h3 className="text-white text-lg md:text-2xl font-semibold drop-shadow">
                  {c.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
