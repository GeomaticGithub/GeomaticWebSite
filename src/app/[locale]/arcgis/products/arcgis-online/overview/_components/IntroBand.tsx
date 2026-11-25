import type { AOOverviewMessages } from "../constants";

export default function IntroBand({
  intro,
}: {
  intro: AOOverviewMessages["intro"];
}) {
  return (
    <section className="bg-[#2C5CF6] text-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24">
        <p className="text-base leading-relaxed w-1/2">{intro.text}</p>
      </div>
    </section>
  );
}
