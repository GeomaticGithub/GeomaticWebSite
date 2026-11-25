// src/app/layout.tsx
// Pass-through root layout: <html lang> is rendered by app/[locale]/layout.tsx
// so each locale gets the correct language attribute (and app/not-found.tsx
// renders its own <html> for unmatched URLs).
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
