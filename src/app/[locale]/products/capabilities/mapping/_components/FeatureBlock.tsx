// _components/FeatureBlock.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Feature } from "../constants";

export default function FeatureBlock({ feature }: { feature: Feature }) {
  const { title, description, image, imageAlt, imageLeft, ctas } = feature;

  // On mobile: text first, image second. On lg+: place image left/right by imageLeft.
  const imgOrder  = `order-2 lg:${imageLeft ? "order-1" : "order-2"}`;
  const textOrder = `order-1 lg:${imageLeft ? "order-2" : "order-1"}`;

  // Optional padding differences per side
  const textPad = imageLeft
    ? "pl-8 lg:pl-20 lg:pr-20"
    : "lg:pl-20";

  return (
    <div className="grid lg:grid-cols-2 items-center bg-[#F3F3F3]">
      {/* Image */}
      <div className={`w-full ${imgOrder}`}>
        <Image
          src={image}
          alt={imageAlt || title}
          width={720}
          height={500}
          className="w-full h-[400px] lg:h-[600px] object-cover"
        />
      </div>

      {/* Text */}
      <div className={`max-w-[1440px] mx-auto px-4 ${textPad} flex items-center ${textOrder}`}>
        <div className="text-left py-8 lg:py-0">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-gray-900">{title}</h2>
          <p className="text-sm lg:text-base leading-relaxed mb-4 lg:mb-6 text-[#4A4A4A]">
            {description}
          </p>

          {ctas?.length ? (
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4">
              {ctas.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  className="inline-flex items-center px-3 lg:px-4 py-2 text-[#009AF2] transition-colors duration-200 text-sm lg:text-base border border-transparent hover:border-[#009AF2]"
                >
                  {c.label}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
