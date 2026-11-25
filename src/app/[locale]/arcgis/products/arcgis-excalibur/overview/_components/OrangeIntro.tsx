import type { ExcaliburMessages } from "../constants";

export default function OrangeIntro({
  data,
}: {
  data: ExcaliburMessages["intro"];
}) {
  return (
    <section className="bg-[#e66315] text-white">
      <div className="flex flex-col gap-2 mx-auto max-w-[1440px] px-6 py-24">
        <h2 className="text-2xl md:text-3xl font-semibold">{data.title}</h2>
        <p className="max-w-4xl text-white/95 leading-relaxed">
          {data.paragraph}
        </p>
      </div>
    </section>
  );
}
