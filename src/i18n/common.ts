// Shared UI strings (buttons, video players, image fallbacks…) used by many pages.
// Page content stays in src/messages/{en,fr}/…; this file is only for generic interface text.

const en = {
  watchVideo: "Watch the video",
  readStory: "Read the story",
  close: "Close",
  closeVideo: "Close the video",
  videoPlayer: "Video player",
  playVideo: "Play the video",
  clickToPlay: "Click to play the video",
  videoThumbnail: "Video thumbnail",
  learnMore: "Learn more",
  contactUs: "Contact us",
  contactSales: "Contact sales",
  documentPreview: "Document preview",
  openDocument: "Open the document",
  successStories: "Success stories",
  hereToHelp: "We're here to help",
  esriDistributor: "Esri Official Distributor",
  opensInNewTab: "(opens in a new tab)",
  scene3d: {
    loading: "Loading the 3D world…",
    preparing: "Preparing interactive 3D buildings and terrain",
    retry: "Retry",
    title: "3D world explorer",
    drag: "Drag:",
    dragDesc: "rotate and explore",
    scroll: "Scroll:",
    scrollDesc: "zoom in/out",
    rightDrag: "Right-click + drag:",
    rightDragDesc: "pan around",
    dblClick: "Double-click:",
    dblClickDesc: "zoom to a location",
    tip: "Navigate to any city to see 3D buildings!",
    caption: "Explore the world in 3D with detailed buildings, terrain and satellite imagery.",
    sceneTitle: "ArcGIS 3D scene",
    error: "Failed to load the 3D scene. Check your connection and try again.",
  },
};

export type CommonMessages = typeof en;

const fr: CommonMessages = {
  watchVideo: "Voir la vidéo",
  readStory: "Lire le témoignage",
  close: "Fermer",
  closeVideo: "Fermer la vidéo",
  videoPlayer: "Lecteur vidéo",
  playVideo: "Lire la vidéo",
  clickToPlay: "Cliquez pour lire la vidéo",
  videoThumbnail: "Miniature de la vidéo",
  learnMore: "En savoir plus",
  contactUs: "Nous contacter",
  contactSales: "Contacter l’équipe commerciale",
  documentPreview: "Aperçu du document",
  openDocument: "Ouvrir le document",
  successStories: "Témoignages clients",
  hereToHelp: "Nous sommes là pour vous aider",
  esriDistributor: "Distributeur officiel Esri",
  opensInNewTab: "(s’ouvre dans un nouvel onglet)",
  scene3d: {
    loading: "Chargement du monde 3D…",
    preparing: "Préparation des bâtiments et du relief 3D interactifs",
    retry: "Réessayer",
    title: "Explorateur 3D",
    drag: "Glisser :",
    dragDesc: "pivoter et explorer",
    scroll: "Molette :",
    scrollDesc: "zoom avant/arrière",
    rightDrag: "Clic droit + glisser :",
    rightDragDesc: "se déplacer",
    dblClick: "Double-clic :",
    dblClickDesc: "zoomer sur un lieu",
    tip: "Rendez-vous dans n’importe quelle ville pour voir les bâtiments en 3D !",
    caption: "Explorez le monde en 3D avec des bâtiments détaillés, le relief et l’imagerie satellite.",
    sceneTitle: "Scène 3D ArcGIS",
    error: "Impossible de charger la scène 3D. Vérifiez votre connexion et réessayez.",
  },
};

const DICT: Record<string, CommonMessages> = { "en-ma": en, "fr-ma": fr };

export function getCommon(locale?: string | null): CommonMessages {
  return DICT[locale ?? ""] ?? en;
}

/** Keys whose value is a plain string (usable with <CommonText k="…" />). */
export type CommonKey = {
  [K in keyof CommonMessages]: CommonMessages[K] extends string ? K : never;
}[keyof CommonMessages];
