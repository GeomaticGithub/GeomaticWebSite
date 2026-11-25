"use client";

import { useState } from "react";
import BenefitBlock from "./BenefitBlock";
import type { InsightsMessages } from "../constants";

export default function Capabilities({
  data,
}: {
  data: InsightsMessages["capabilities"];
}) {
  const [activeTab, setActiveTab] = useState(0);
  const { title, desc, tabs, blocks } = data;

  return (
    <section className="bg-white">
      <div className="flex flex-col gap-4 mx-auto max-w-[1440px] px-6 py-12">
        <h3 className="text-center text-2xl md:text-5xl font-semibold text-gray-900">
          {title}
        </h3>
        <p className="text-center text-gray-900 w-1/2 mx-auto">
          {desc}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 font-medium transition-all duration-300 ${
                activeTab === index
                  ? "border-b-2 border-[#df5100] text-[#df5100]"
                  : "text-gray-700 hover:border-b-2 hover:border-gray-200"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="mt-6">
          {blocks[activeTab] && <BenefitBlock block={blocks[activeTab]} />}
        </div>
      </div>
    </section>
  );
}
