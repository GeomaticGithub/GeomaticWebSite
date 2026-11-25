import Image from "next/image";
import ShareStories, { StoryItem } from "./ShareStories";
import type { WhatIsGisMessages } from "../constants";

export default function SplitWhatIs({
  data,
}: {
  data: WhatIsGisMessages["split"];
}) {
  // Map split.items to ShareStories format
  const items: StoryItem[] = data.items.map((item, idx) => ({
    id: idx + 1,
    title: item.label,
    description: item.description,
    avatarImage: item.avatarImage,
    mainImage: item.mainImage,
    linkText: item.linkText,
    href: item.href,
  }));

  return (
    <ShareStories
      title={data.title}
      description={data.description}
      items={items}
    />
  );
}
