import type { ReactNode } from "react";

/** Titles written between asterisks in the content (*The ArcGIS Book*) are shown in italics. */
export function emph(text: string): ReactNode[] {
  return text.split(/\*([^*]+)\*/g).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part));
}
