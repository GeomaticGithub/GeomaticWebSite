"use client";

import Image from "next/image";

type Props = {
  data: {
    title: string;
    paragraphs: string[];
    illustration?: string;
  };
};

export default function Projects({ data }: Props) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-teal-900 to-slate-900" />
      <div className="mx-auto max-w-[1440px] px-4 py-6 grid md:grid-cols-5 gap-24 items-center text-slate-100">
        <div className="md:col-span-2 order-2 md:order-1 relative z-10">
          <div className="relative">
            <div className="aspect-[4/4]">
              {data.illustration ? (
                <Image
                  src={data.illustration}
                  alt=""
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center opacity-70">
                  {/* Placeholder if no image provided */}
                  <span className="text-8xl">▦</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="md:col-span-3 order-1 md:order-2 w-3/4 mx-auto relative z-10">
          <h3 className="text-3xl font-semibold mb-6">{data.title}</h3>
          <div className="space-y-4 text-base leading-7 text-slate-200/90">
            {data.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
