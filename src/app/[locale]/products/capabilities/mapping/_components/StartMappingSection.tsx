"use client";
import Image from "next/image";

export default function StartMappingSection({ data }: { data: any }) {
  const { title, subtitle, ...cards } = data;

  return (
    <section className="bg-[#323232]">
      <div className="max-w-[1440px] mx-auto">
        <div className="px-6 py-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-6">{title}</h2>
          <p className="text-base leading-relaxed max-w-4xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="px-6 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.values(cards).map((c: any, i) => (
              <div
                key={i}
                className="bg-white shadow-lg overflow-hidden h-full flex flex-col border border-[#4A4A4A] hover:border-[#009AF2] transition-colors"
              >
                <div className="h-48 relative">
                  <Image src={c.img} alt={c.title} fill className="object-cover" />
                </div>
                <div className="bg-[#2B2B2B] p-6 flex-1">
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {c.category}
                  </h3>
                  <h4 className="text-sm font-medium mb-3 text-gray-300">{c.title}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
