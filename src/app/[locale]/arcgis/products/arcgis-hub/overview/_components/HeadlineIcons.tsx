"use client";

import { useState } from "react";
import BenefitBlock from "./BenefitBlock";
import type { HubOverviewMessages } from "../constants";

export default function HeadlineIcons({
  data,
}: {
  data: HubOverviewMessages["benefits"];
}) {
  const [activeTab, setActiveTab] = useState(0);
  const { title, tabs, blocks } = data;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <h3 className="text-center text-2xl md:text-3xl font-semibold text-gray-900">
          {title}
        </h3>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 font-medium transition-all duration-300 ${
                activeTab === index
                  ? "border-b-2 border-blue-600 text-blue-700"
                  : "text-gray-700 hover:border-b-2 hover:border-gray-200"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="mt-12">
          {blocks[activeTab] && <BenefitBlock block={blocks[activeTab]} />}
        </div>
      </div>
    </section>
  );
}
