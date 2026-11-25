import { Figtree } from "next/font/google";

// Figtree: clean geometric sans close to Avenir Next (Esri's typeface), full French accent support.
// Self-hosted by next/font at build time (no request to Google from visitors), swap to avoid invisible text.
export const fontSans = Figtree({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans",
});
