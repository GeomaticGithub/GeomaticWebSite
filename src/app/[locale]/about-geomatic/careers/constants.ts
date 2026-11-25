export type AssetPageT = {
  hero: {
    title: string;
    description?: string;
    image?: string;
    bgGraphic: string;
  };
  intro: {
    title: string;      // used only for accessibility/structure
    subTitle?: string;  // optional
    bgGraphic?: string; // optional
    paragraph: string;  // first paragraph
  };
  community: {
    title: string; // e.g., "We are best in the field"
    cards: Array<{
      title: string;    // section heading
      desc: string;     // section body
      image?: string;   // section image (when present renders alternating layout)
      gradient?: string; // for CTA band background (when image is not provided)
      link?: string;    // CTA link (mailto or URL)
      cta?: string;     // CTA label
    }>;
  };
};
