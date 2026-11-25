import type { AssetPageT } from "../constants";

export default function Intro({ data }: { data: AssetPageT["intro"] }) {
  return (
    <section className="text-black">
      <div className="flex flex-col gap-2 mx-auto max-w-[1440px] px-6 py-32 border-b">
        <p className="max-w-3xl leading-relaxed">{data.paragraph1}</p>
        <p className="max-w-3xl leading-relaxed">{data.paragraph2}</p>
      </div>
    </section>
  );
}
