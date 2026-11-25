"use client";

type Props = {
  data: {
    description: string;
    title: string;
    cards: { title: string; desc: string; icon?: string }[];
  };
};

export default function Services({ data }: Props) {
  return (
    <section className="bg-[#2B2B2B]">
      <div className="mx-auto max-w-[1440px] px-4 py-16 text-slate-100">
        <h3 className="text-2xl font-semibold">{data.title}</h3>
        <p className="mt-4 text-sm/6 text-slate-300 max-w-2xl">{data.description}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data.cards.map((c, i) => (
            <article
              key={i}
              className="p-5 hover:ring-emerald-400/40 transition"
            >
              <div className="h-10 w-10 rounded-xl bg-emerald-400/10 ring-1 ring-emerald-400/30 flex items-center justify-center">
                <span>☰</span>
              </div>
              <h4 className="mt-4 text-xl font-semibold">{c.title}</h4>
              <p className="mt-2 text-sm/6 text-slate-300">{c.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
