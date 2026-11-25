"use client";

import Image from "next/image";

type Props = {
  data: {
    title: string;
    subTitle: string;
    bgGraphic: string;
    paragraph: string;
  };
};

export default function Intro({ data }: Props) {
  return (
    <section className="bg-white">
      <div className="mx-auto px-4 py-10">
        <div  className="text-center">
          <h2 className="text-xl md:text-3xl font-semibold text-slate-900">
            {data.title}
          </h2>
          <p className="mt-2 text-sm uppercase tracking-wide text-slate-500">
            {data.subTitle}
          </p>
        </div>
      </div>
    </section>
  );
}
