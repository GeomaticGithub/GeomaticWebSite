import CapabilityBlock from "./CapabilityBlock";
import type { DevOverviewMessages } from "../constants";

export default function Capabilities({
  data,
}: {
  data: DevOverviewMessages["capabilities"];
}) {
  const { heading, sections } = data;

  // Only show the first 2 sections
  const displaySections = sections.slice(0, 2);

  return (
    <section className="bg-[#faf9ff]">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="mt-10 space-y-4">
          {displaySections.map((s, i) => (
            <CapabilityBlock key={i} block={s} parent="capabilities" />
          ))}
        </div>
      </div>
    </section>
  );
}
