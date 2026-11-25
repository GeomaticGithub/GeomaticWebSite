"use client";

type Props = {
  data: {
    title: string;
    blurb?: string;
  };
};

export default function Engagement({ data }: Props) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold">{data.title}</h2>
        <p className="mt-3 text-slate-600">{data.blurb}</p>
      </div>
    </section>
  );
}
