// _components/FeaturesSection.tsx
"use client";

import FeatureBlock from "./FeatureBlock";
import ShareStories from "./ShareStories";
import type {
  SectionsMessages,
} from "../constants";

export default function FeaturesSection({
  sections,
}: {
  sections: SectionsMessages;
}) {
  const sectionKeys = Object.keys(sections);

  return (
    <section className="bg-[#F3F3F3] flex flex-col gap-6">
      {sectionKeys.map((key, i) => {
        const s = sections[key];
        return (
          <FeatureBlock
            key={key}
            feature={{
              id: key,
              title: s.title,
              description: `${s.p1}${s.p2 ? ` ${s.p2}` : ""}`,
              image: s.image,
              imageAlt: s.title,
              imageLeft: i % 2 === 1,
              ctas: [
                ...(s.link1 ? [{ label: s.link1, href: "#" }] : []),
                ...(s.link2 ? [{ label: s.link2, href: "#" }] : []),
              ],
            }}
          />
        );
      })}
    </section>
  );
}
