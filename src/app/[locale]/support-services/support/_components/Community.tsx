"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AssetPageT } from "../constants";

function getCurrentLocaleFromPath(pathname: string): string {
  const seg = pathname.split("/")[1];
  return /^[a-z]{2}-[a-z]{2}$/i.test(seg) ? seg : "en-ma";
}

export default function Community({ data }: { data: AssetPageT["community"] }) {
  const pathname = usePathname();
  const locale = getCurrentLocaleFromPath(pathname);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-900">
          {data.title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
          {data.cards.map((card, index) => (
            <Link
              key={index}
              href={`/${locale}${card.link}`}
              className="group relative overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${card.gradient} group-hover:scale-105 transition-transform duration-500`}
              />

              <div className="relative z-10 p-8 h-full flex flex-col items-center text-center text-white">
                <div className="w-16 h-16 p-3 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors duration-300">
                  <Image
                    src={card.image}
                    alt={card.title}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>

                <h3 className="text-xl font-bold mb-4 group-hover:text-white/90 transition-colors duration-300">
                  {card.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
