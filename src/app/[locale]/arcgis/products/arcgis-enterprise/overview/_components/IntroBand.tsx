import type { EnterpriseOverviewMessages } from "../constants";

export default function IntroBand({ intro }: { intro: EnterpriseOverviewMessages["intro"] }) {
  return (
    <section className="bg-[#5b35ea] text-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-32">
        <p className="text-base leading-relaxed opacity-90 w-1/2">{intro.paragraph}</p>
      </div>
    </section>
  );
}
