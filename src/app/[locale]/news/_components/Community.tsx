"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  data: {
    title: string;
    cards: {
      title: string;
      desc?: string;
      image?: string;
      gradient?: string;
      gradientStart?: string;
      gradientMiddle?: string;
      gradientEnd?: string;
      link: string;
      cta?: string;
      icon: string;
    }[];
  };
};

export default function Community({ data }: Props) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1]; // Extract locale from pathname

  return (
    <section className="bg-white">
      <div className="mx-auto">
        <div className="grid md:grid-cols-3">
          {data.cards.map((c, i) => (
            <Link
              key={i}
              href={c.link.startsWith("http") ? c.link : `/${locale}${c.link}`}
              target={c.link.startsWith("http") ? "_blank" : undefined}
              className="group relative h-44 md:h-64 ring-slate-200 transition hover:scale-[1.02]"
            >
              <div
                className="absolute inset-0 opacity-90 group-hover:opacity-95 transition-opacity"
                style={{
                  background:
                    c.gradient ||
                    `linear-gradient(to right, ${c.gradientStart || "#000"}, ${
                      c.gradientMiddle || "#555"
                    }, ${c.gradientEnd || "#888"})`,
                }}
              />
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10 flex flex-col items-center justify-center text-center h-full">
                <Image
                  src={c.icon}
                  alt={c.title}
                  width={50}
                  height={50}
                  className="mb-4"
                />
                <h3 className="text-2xl font-semibold text-white">{c.title}</h3>
                <p className="mt-2 text-sm text-white/80 max-w-xs">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
