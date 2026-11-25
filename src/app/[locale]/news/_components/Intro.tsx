"use client";

type Props = {
  data: {
    title: string;
    subTitle?: string;
    paragraph: string;
  };
};

export default function Intro({ data }: Props) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-semibold text-slate-900">
          {data.title}
        </h2>
        <p className="mt-1 text-slate-500 uppercase tracking-wide text-sm">
          {data.subTitle}
        </p>
        <p className="mt-4 text-slate-700 leading-relaxed w-1/2">{data.paragraph}</p>
      </div>
    </section>
  );
}
