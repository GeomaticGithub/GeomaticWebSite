// _components/constants.ts
export type Cta = { label: string; href: string };
export type Feature = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  ctas?: Cta[];
  // if true -> image on LEFT (on lg+), else image on RIGHT
  imageLeft?: boolean;
};

export type StoryItem = {
  id: number;
  avatarImage: string;
  mainImage: string;
  title: string;
  description: string;
  linkText: string;
  href?: string;
};

export type CTA = { label: string; href: string };

export type FeatureMsg = {
  image: string;
  title: string;
  p1: string;
  p2?: string;
  link1?: string;
  link2?: string;
};

export type SectionsMessages = Record<string, FeatureMsg>;

export type ShareItemMsg = {
  label: string;
  title: string;
  desc: string;
  linkText?: string;
  href?: string;
  avatarImage?: string;
  mainImage?: string;
};

export type UserTypesMsg = {
  title: string;
  desc: string;
  link: string;
  href: string;
};

export type UserTypesMessages = Record<string, UserTypesMsg>;

export const FEATURES: Feature[] = [
  {
    id: "map",
    title: "Map your data",
    description:
      "Bring your data into a map and discover spatial relationships for the first time. Many file types are supported by Esri's mapping software, including spreadsheets, KML, GeoJSON, and common geospatial files. Esri provides complete data hosting, or you can host it on your infrastructure. Use geocoding to transform your addresses into points on a map and set up multimodal routes. Create maps that display data dynamically as soon as it is updated and improve the quality of your decisions by referencing the most up-to-date data.",
    image: "/mapping/map-your-data.gif",
    imageAlt: "Map your data",
    imageLeft: false,
    ctas: [
      { label: "Complete geocoding experience", href: "#" },
      { label: "See ways to work with data", href: "#" },
    ],
  },
  {
    id: "interact",
    title: "Interact with your map",
    description:
      "Interactive web maps give you and your team the opportunity to explore and update data. As you zoom in, additional data and insights become available. Click on the map to discover location-specific data displayed in charts or infographics. Filter data and change the symbology to gain additional perspectives and reveal new patterns. Use your maps even without a network or cellular connection. Download your maps before you go, and conveniently access them on your smartphone or tablet. Once you are connected again any data you or your team added is automatically synchronized.",
    image: "/mapping/interact-with-map.gif",
    imageAlt: "Interact with your map",
    imageLeft: true,
    ctas: [
      { label: "Explore this interactive map", href: "#" },
      { label: "Take maps offline", href: "#" },
    ],
  },
  {
    id: "understand",
    title: "Understand your data",
    description:
      "Discover and refine your data's story using a set of intuitive analysis tools, such as drive times and buffers. Smart mapping, pioneered by Esri, uses data-driven styling, colors, and symbols to guide your exploration and transform your raw data into useful information. You can also understand your data better by visualizing it with different map styles.",
    image: "/mapping/undertand-data.jpg",
    imageAlt: "Understand your data",
    imageLeft: false,
    ctas: [
      { label: "Learn about smart mapping", href: "#" },
      { label: "Explore map styles", href: "#" },
    ],
  },
  {
    id: "enrich",
    title: "Enhance your data",
    description:
      "Deepen your understanding and expose relationships by adding authoritative data, such as demographics, imagery, boundaries, and live feeds, to your map. ArcGIS Living Atlas of the World is included with every ArcGIS mapping product.",
    image: "/mapping/enrich-data.jpg",
    imageAlt: "Enhance your data",
    imageLeft: true,
    ctas: [
      { label: "Explore ArcGIS Living Atlas", href: "#" },
      { label: "Learn about data enrichment", href: "#" },
    ],
  },
  {
    id: "personalize",
    title: "Personalize your maps",
    description:
      "Brand and personalize your maps using custom symbols, colors, and basemaps. Make your data pop by placing it on a historic, creative, or present-day basemap. You can also customize the basemaps or build your own.",
    image: "/mapping/personalize-map.gif",
    imageAlt: "Personalize your maps",
    imageLeft: false,
    ctas: [
      { label: "Explore basemap gallery", href: "#" },
      { label: "Learn about custom symbols", href: "#" },
    ],
  },
];

export const STORIES: StoryItem[] = [
  {
    id: 1,
    avatarImage: "/mapping/share-configurable-thumb.jpg",
    mainImage: "/mapping/share-configurable.jpg",
    title: "ArcGIS Configurable Apps",
    description:
      "Easily create and share your maps as interactive web apps. Select from a variety of ready-to-use templates.",
    linkText: "View ArcGIS Configurable Apps",
    href: "#",
  },
  {
    id: 2,
    avatarImage: "/mapping/share-storymaps-thumb.jpg",
    mainImage: "/mapping/share-storymaps.jpg",
    title: "ArcGIS StoryMaps",
    description:
      "Bring text, photos, and videos together with maps to create remarkable stories that resonate with your audience.",
    linkText: "Explore ArcGIS StoryMaps",
    href: "#",
  },
  {
    id: 3,
    avatarImage: "/mapping/share-ops-dashboard-thumb.jpg",
    mainImage: "/mapping/share-ops-dashboard.jpg",
    title: "ArcGIS Dashboards",
    description:
      "Create a dynamic dashboard to gain a real-time operational view of your people, services, assets, and events.",
    linkText: "Explore Operations Dashboard",
    href: "#",
  },
  {
    id: 4,
    avatarImage: "/mapping/share-app-builder-thumb.jpg",
    mainImage: "/mapping/share-app-builder.jpg",
    title: "Web AppBuilder for ArcGIS",
    description:
      "Create custom apps using preconfigured tools that do not require coding.",
    linkText: "Explore Web AppBuilder",
    href: "#",
  },
];








// Simple image registry (optional but tidy)
export const PRODUCT_IMAGES = {
  online: "/mapping/product-arcgis-online.jpg",
  enterprise: "/mapping/product-arcgis-enterprise.jpg",
  devtools: "/mapping/product-dev-tools.jpg",
  pro: "/mapping/product-arcgis-pro.jpg",
} as const;

export type ProductKey = "online" | "enterprise" | "devtools" | "pro";

export type ProductCard = {
  key: ProductKey;
  img: string;           // path to image
  category: string;      // “Cloud-based SaaS”
  title: string;         // “ArcGIS Online”
  desc: string;          // description
  href?: string;         // optional link
};

export type StartMappingBlock = {
  title: string;
  subtitle: string;
  cards: ProductCard[];
};

// Example (English). For i18n, build this object from messages in your page/server.
export const START_MAPPING_EXAMPLE: StartMappingBlock = {
  title: "Start mapping and understanding your data",
  subtitle:
    "There are many ways to access Esri's mapping capabilities including cloud-based SaaS, self-managed infrastructure, developer tools, and desktop software.",
  cards: [
    {
      key: "online",
      img: PRODUCT_IMAGES.online,
      category: "Cloud-based SaaS",
      title: "ArcGIS Online",
      desc:
        "Get started with ArcGIS Online, Esri's cloud-based, software-as-a-service product. Your maps, apps, and data are hosted and accessible anywhere.",
      href: "#",
    },
    {
      key: "enterprise",
      img: PRODUCT_IMAGES.enterprise,
      category: "Infrastructure you manage",
      title: "ArcGIS Enterprise",
      desc:
        "Do you manage your own infrastructure behind a firewall or in the cloud? Use ArcGIS Enterprise for your mapping and location enablement needs.",
      href: "#",
    },
    {
      key: "devtools",
      img: PRODUCT_IMAGES.devtools,
      category: "Developer tools",
      title: "ArcGIS for Developers",
      desc:
        "Use a robust set of developer tools to develop apps or customize maps and apps built in ArcGIS Online or ArcGIS Enterprise.",
      href: "#",
    },
    {
      key: "pro",
      img: PRODUCT_IMAGES.pro,
      category: "Desktop GIS",
      title: "ArcGIS Pro",
      desc:
        "Complete advanced mapping, analysis, and data management workflows using ArcGIS Pro.",
      href: "#",
    },
  ],
};
