// _components/FeaturesSection.tsx
"use client";

import FeatureBlock from "./FeatureBlock";
import ShareStories from "./ShareStories";
import type { SectionsMessages, ShareMessages, ShareItemMsg } from "../constants";

export default function FeaturesSection({
  sections,
  share,
}: {
  sections: SectionsMessages;
  share: ShareMessages;
}) {
  const sectionKeys = Object.keys(sections);

  return (
    <section className="bg-white">
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

      <ShareStories
        title={share.title}
        description={share.description}
        items={
          Object.values(share.items).map((it: ShareItemMsg, idx) => ({
            id: idx + 1,
            title: it.title,
            description: it.desc,
            avatarImage: it.avatarImage ?? "/mapping/fallback-thumb.jpg",
            mainImage: it.mainImage ?? "/mapping/fallback.jpg",
            linkText: it.linkText ?? "Learn more",
            href: it.href ?? "#",
          }))
        }
      />
    </section>
  );
}
