import type { AssetPageT } from "../constants";

export default function Intro({ data }: { data: AssetPageT["intro"] }) {
  return (
    <section className="bg-[#2C5198] text-white">
      <div className="flex flex-col gap-2 mx-auto max-w-[1440px] px-6 py-32">
        <p className="max-w-3xl leading-relaxed">{data.paragraph}</p>
      </div>
    </section>
  );
}
