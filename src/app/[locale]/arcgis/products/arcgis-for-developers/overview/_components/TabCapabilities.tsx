"use client";

import { useState } from "react";
import CapabilityBlock from "./CapabilityBlock";
import type { DevOverviewMessages } from "../constants";

export default function TabCapabilities({
  data,
}: {
  data: DevOverviewMessages["capabilities"];
}) {
  const [activeTab, setActiveTab] = useState(0);
  const { heading, tabs, blocks } = data;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <h3 className="text-center text-2xl md:text-3xl font-semibold text-gray-900">
          {heading}
        </h3>

        {/* Interactive Tab Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                activeTab === index
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Active Capability Block */}
        <div className="mt-12">
          {blocks[activeTab] && (
            <CapabilityBlock
              block={{
                ...blocks[activeTab],
                side: "image-left",
              }}
              parent="tabCapabilities"
            />
          )}
        </div>

        {/* Fallback if no block exists for the active tab */}
        {!blocks[activeTab] && (
          <div className="mt-12 text-center text-gray-500">
            <p>Content for "{tabs[activeTab]}" coming soon...</p>
          </div>
        )}
      </div>
    </section>
  );
}
