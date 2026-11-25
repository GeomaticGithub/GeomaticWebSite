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

  const cards = [
    {
      title: data.leftTitle,
      desc: data.leftDesc,
      image: data.leftImage,
      bgImage: data.leftBgImage,
      link: `/${locale}${data.leftLink}`,
      cta: data.leftCta,
    },
    {
      title: data.centerTitle,
      desc: data.centerDesc,
      image: data.centerImage,
      bgImage: data.centerBgImage,
      link: `/${locale}${data.centerLink}`,
      cta: data.centerCta,
    },
    {
      title: data.rightTitle,
      desc: data.rightDesc,
      image: data.rightImage,
      bgImage: data.rightBgImage,
      link: `/${locale}${data.rightLink}`,
      cta: data.rightCta,
    },
  ];

  return (
    <section className="relative">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 text-white">
        {cards.map((card, index) => (
          <Link
            key={index}
            href={card.link}
            className={`group relative py-16 px-6 flex flex-col items-center text-center gap-4 transition-all duration-300 overflow-hidden ${
              index < cards.length - 1 ? "border-r border-white/20" : ""
            }`}
          >
            <Image
              src={card.bgImage}
              alt=""
              fill
              className="absolute inset-0 z-0 object-cover group-hover:scale-105 transition-transform duration-500"
            />

            <div className="absolute inset-0 z-10 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />

            <div className="relative z-20 flex flex-col items-center gap-4">
              <div className="w-16 h-16 p-3 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Image
                  src={card.image}
                  alt={card.title}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                {/* <h3 className="text-lg font-bold mb-2">{card.title}</h3> */}
                <p className="text-white/90 text-sm leading-relaxed max-w-xs">
                  {card.desc}
                </p>
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 group-hover:text-white">
                <span>{card.cta}</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
