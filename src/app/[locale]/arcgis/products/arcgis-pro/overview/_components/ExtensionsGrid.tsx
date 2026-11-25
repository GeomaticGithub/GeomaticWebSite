"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProOverviewMessages } from "../constants";
import Link from "next/link";

export default function ExtensionsGrid({
  ext,
}: {
  ext: ProOverviewMessages["extensions"];
}) {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

  const selectedCategory = ext.categories[selectedCategoryIndex];

  return (
    <section className="bg-[#111] text-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 py-12">
        <h4 className="text-2xl font-semibold mb-8 text-center">{ext.title}</h4>

        {/* Category Selection Row */}
        <div className="flex justify-center mb-8">
          <div className="grid grid-cols-3 gap-4 bg-white/5 p-2 rounded-lg">
            {ext.categories.map((category, i) => (
              <button
                key={`${category.label}-${i}`}
                onClick={() => setSelectedCategoryIndex(i)}
                className={`px-6 py-3 rounded-md font-semibold transition-all duration-300 ${
                  i === selectedCategoryIndex
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {selectedCategory.cards.map((c, i) => (
            <Link
              href={c.actionUrl}
              key={`${c.title}-${i}`}
              className="bg-white/5 rounded-md overflow-hidden hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative h-36 w-full">
                <Image
                  src={c.image}
                  alt={c.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <div className="font-semibold">{c.title}</div>
                <p className="text-sm text-white/85 mt-1">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
