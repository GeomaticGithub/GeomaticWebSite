"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";

export type StoryItem = {
  id: number;
  avatarImage: string;
  mainImage: string;
  title: string;
  description: string;
  linkText: string;
  href?: string;
};

export default function ShareStories({
  title = "Share your story",
  description,
  items,
}: {
  title?: string;
  description?: string;
  items: StoryItem[];
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? 1);

  const active = useMemo(
    () => items.find((i) => i.id === activeId) ?? items[0],
    [activeId, items]
  );

  return (
    <div className="grid lg:grid-cols-2 items-center bg-[#2B2B2B] text-white">
      {/* Left: image */}
      <div className="w-full order-2 lg:order-1 relative">
        <Image
          src={active.mainImage}
          alt={active.title}
          width={720}
          height={500}
          className="w-full h-[400px] lg:h-[900px] object-cover"
          priority
        />
        <div className="absolute bottom-4 md:bottom-8 lg:bottom-20 left-4 right-4 md:left-8 md:right-8 lg:left-1/2 lg:-translate-x-1/2 lg:right-auto bg-[#3A3A3A] p-6 w-auto lg:w-3/4 max-w-xl">
          <h3 className="text-lg lg:text-xl font-bold mb-2">{active.title}</h3>
          <p className="text-sm text-gray-300 mb-3">{active.description}</p>
          <Link
            href={active.href ?? "#"}
            className="text-[#009AF2] hover:underline text-sm"
          >
            {active.linkText} ↗
          </Link>
        </div>
      </div>

      {/* Right: text + selectors */}
      <div className="max-w-[1440px] mx-auto px-4 pl-8 lg:pl-20 lg:pr-20 flex items-center order-1 lg:order-2">
        <div className="py-8 lg:py-0 flex flex-col gap-3">
          <h2 className="text-2xl lg:text-3xl font-semibold">
            {title}
          </h2>
          <p className="leading-relaxed pb-2">{description}</p>
          <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2">
            {items.map((option) => {
              const activeStyle =
                activeId === option.id
                  ? "border-[#009AF2] bg-white/5"
                  : "border-[#B5B5B5] hover:border-[#009AF2]";

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setActiveId(option.id)}
                  className={`flex items-center gap-3 p-2 lg:p-3 border ${activeStyle} transition-colors flex-shrink-0`}
                >
                  <Image
                    src={option.avatarImage}
                    alt={option.title}
                    width={48}
                    height={48}
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover"
                  />
                  <span className="hidden lg:inline text-sm">
                    {option.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
