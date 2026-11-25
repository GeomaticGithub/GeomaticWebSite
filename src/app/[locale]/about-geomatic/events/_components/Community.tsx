"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  data: {
    title: string;
    cards: {
      title: string;
      desc?: string;
      link: string;
      cta?: string;
    }[];
    searchButton?: {
      text: string;
      link: string;
    };
  };
};

export default function Community({ data }: Props) {
  const pathname = usePathname();
  const locale = pathname.split("/")[1]; // Extract locale from pathname

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-4 pb-16">
        <h3 className="font-semibold text-center py-16 text-3xl">
          {data.title}
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.cards.map((c, i) => (
            <Link
              key={i}
              href={c.link.startsWith("http") ? c.link : `/${locale}${c.link}`}
              target={c.link.startsWith("http") ? "_blank" : undefined}
              className="block py-2 px-2 text-blue-500 transition-colors duration-200 border-b hover:border-blue-500 group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base">{c.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{c.desc}</div>
                </div>
                <span className="text-blue-600 group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
        {data?.searchButton && (
          <div className="mt-8 text-center">
            <Link
              href={data.searchButton.link}
              target="_blank"
              className="inline-flex text-sm items-center gap-2 py-2 px-4 text-blue-600 border border-blue-600 hover:text-blue-800 hover:border-blue-800 transition-colors duration-200 group"
            >
              <span>{data.searchButton.text}</span>
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                →
              </span>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
