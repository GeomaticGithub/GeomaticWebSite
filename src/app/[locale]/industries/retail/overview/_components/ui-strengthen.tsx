"use client";
import Image from "next/image";
import type { StrengthenT } from "../constants";

export default function StrengthenBand({ data }: { data: StrengthenT }) {
  return (
    <section className="bg-[#323232] text-white">
      <div className="mx-auto max-w-[1440px] px-6 pt-16">
        <h2 className="text-2xl md:text-5xl text-center">{data.title}</h2>
        <p className="mt-8 text-neutral-200 md:text-lg text-center w-4/5 mx-auto">
          {data.paragraph}
        </p>

        {/* Image Section */}
        <div className="mt-12 bg-[#2B2B2B]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[300px] lg:min-h-[450px]">
            {/* Image - Left Side */}
            <div className="order-2 lg:order-1 flex items-end">
              <div className="relative w-full aspect-video overflow-hidden bg-neutral-800">
                <Image
                  src={data.imageSection.image}
                  alt={data.imageSection.title}
                  className="w-full h-full object-cover"
                  layout="fill"
                />
              </div>
            </div>

            {/* Content - Right Side */}
            <div className="order-1 lg:order-2 flex flex-col justify-center">
              <h3 className="text-xl font-semibold md:text-2xl lg:text-2xl">
                {data.imageSection.title}
              </h3>
              <p className="mt-4 text-neutral-200 md:text-lg leading-relaxed">
                {data.imageSection.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
