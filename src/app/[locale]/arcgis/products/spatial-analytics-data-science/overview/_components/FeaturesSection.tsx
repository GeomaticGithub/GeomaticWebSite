import FeatureBlock from "./FeatureBlock";
import type { SectionsMessages } from "../constants";

export default function FeaturesSection({
  sections,
}: {
  sections: SectionsMessages;
}) {
  const sectionKeys = Object.keys(sections);
  const sectionEntries = Object.entries(sections)
  .sort(([a],[b]) => a.localeCompare(b));

  return (
    <section className="bg-[#F3F3F3] flex flex-col gap-6">
      {sectionEntries.map(([key, s], i) => (
        <FeatureBlock
          key={key}
          feature={{
            id: key,
            title: (s as any)?.title ?? "",
            description: `${(s as any)?.p1 ?? ""}${
              (s as any)?.p2 ? ` ${(s as any).p2}` : ""
            }`,
            image: (s as any)?.image,
            imageAlt: (s as any)?.title ?? "",
            imageLeft: i % 2 === 1,
            ctas: [
              ...((s as any)?.link1
                ? [{ label: (s as any).link1, href: "#" }]
                : []),
              ...((s as any)?.link2
                ? [{ label: (s as any).link2, href: "#" }]
                : []),
            ],
          }}
        />
      ))}
    </section>
  );
}
