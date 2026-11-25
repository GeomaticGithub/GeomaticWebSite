"use client";

type Props = {
  data: {
    items: { title: string; desc: string; icon?: string }[];
  };
};

export default function Features({ data }: Props) {
  return (
    <section className="bg-[#4c4c4c] text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-8 md:grid-cols-3">
        {data.items.map((it, i) => (
          <div key={i} className="flex flex-col items-start gap-4">
            <div className="mt-1 h-10 w-10 rounded-xl bg-emerald-400/10 ring-1 ring-emerald-400/30 flex items-center justify-center">
              {/* You can replace with <Image src={it.icon!} .../> if you have icons */}
              <span className="text-lg">★</span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold">{it.title}</h3>
              <p className="mt-2 text-sm/6 text-slate-300">{it.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
