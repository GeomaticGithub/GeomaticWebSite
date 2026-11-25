"use client";

import { useState } from "react";
import BenefitBlock from "./BenefitBlock";
import type { PowerBIMessages } from "../constants";
import Image from "next/image";

export default function FeatureBlock({
  data,
}: {
  data: PowerBIMessages["feature"];
}) {
  const [activeTab, setActiveTab] = useState(0);
  const { title, desc, tabs, blocks } = data;

  return (
    <section className="bg-[#363636]">
      <div className="flex flex-col gap-4 mx-auto max-w-[1440px] px-6 py-12 pt-24">
        <h3 className="text-center text-2xl md:text-5xl font-semibold text-white">
          {title}
        </h3>
        <p className="text-center text-white w-1/2 mx-auto">{desc}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 border-b-[1px] border-gray-600">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex flex-col items-center px-6 py-3 font-medium transition-all duration-300 ${
                activeTab === index
                  ? "border-b-2 border-[#F2C812] text-[#F2C812]"
                  : "text-white hover:border-b-2 hover:border-gray-200"
              }`}
            >
              <Image
                src={tab.icon}
                alt=""
                width={50}
                height={50}
                className="inline-block mr-2 mb-1"
              />
              <h1>{tab.title}</h1>
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
