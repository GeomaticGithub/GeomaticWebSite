import type { FieldServicePageT } from "../constants";

export default function Intro({ data }: { data: FieldServicePageT["intro"] }) {
  return (
    <section className="bg-gradient-to-r from-[#5d0ccc] to-[#005aff] text-white">
      <div className="flex flex-col gap-2 mx-auto max-w-[1440px] px-6 py-24">
        <h2 className="text-2xl lg:text-4xl font-semibold">{data.title}</h2>
        <p className="max-w-2xl leading-relaxed">{data.paragraph}</p>
      </div>
    </section>
  );
}
