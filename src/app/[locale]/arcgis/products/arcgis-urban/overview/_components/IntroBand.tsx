import type { UrbanOverviewMessages } from "../constants";

export default function IntroBand({
  intro,
}: {
  intro: UrbanOverviewMessages["intro"];
}) {
  return (
    <section className="bg-[#1fa5d7]">
      <div className="mx-auto max-w-[1440px] px-6 py-32">
        <p className="max-w-3xl text-white/95 leading-relaxed">{intro.paragraph}</p>
      </div>
    </section>
  );
}
