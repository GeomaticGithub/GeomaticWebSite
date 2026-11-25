import type { HubOverviewMessages } from "../constants";

export default function IntroBand({
  intro,
}: {
  intro: HubOverviewMessages["intro"];
}) {
  return (
    <section className="bg-[#5a38d6]">
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <p className="max-w-4xl text-white/95 leading-relaxed">
          {intro.paragraph}
        </p>
      </div>
    </section>
  );
}
