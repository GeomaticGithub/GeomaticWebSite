export type OverviewMessages = {
  hero: {
    title: string;
    subtitle: string;
    bgImage: string; // e.g. "/3d-gis/overview-hero.jpg"
  };
  intro: {
    title: string; // "Our world is 3D"
    description: string; // small paragraph under the title
    linkText?: string; // optional "Click to view..."
    linkHref?: string;
    embedUrl: string; // the 3D scene iframe URL
  };
  strip: {
    title: string; // "ArcGIS is 3D"
    bgImage?: string; // dark background image (optional)
    items: Array<{
      icon: string; // e.g., "cube", "analyze", "visualize", "share"
      title: string;
      desc: string;
    }>;
  };
  building: {
    title: string; // main section title
    subtitle: string; // main section subtitle
    image: string; // left hero image (3D building/BIM)
    imageAlt: string;
    captionTitle: string; // small caption under the image
    captionText: string;
    useCasesTitle: string; // right column title
    useCases: Array<{ label: string }>;
    images: {
      building: {
        alt: string;
        title: string;
        description: string;
        href: string;
        link: string;
      };
      campus: {
        alt: string;
        title: string;
        description: string;
        href: string;
        link: string;
      };
      city: {
        alt: string;
        title: string;
        description: string;
        href: string;
        link: string;
      };
      region: {
        alt: string;
        title: string;
        description: string;
        href: string;
        link: string;
      };
      globe: {
        alt: string;
        title: string;
        description: string;
        href: string;
        link: string;
      };
    };
  };
  closerLook: {
    title: string; // "Take a Closer Look at Esri"
    image: string;
    imageAlt: string;
  };
  crossPlatform: {
    title: string; // "Cross-platform Capability"
    categories: string[]; // ["3D Apps", "3D App Builders"]
  };
};
