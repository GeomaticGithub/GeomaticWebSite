"use client";
// Client component: Next.js 15 only allows a browser-only block (ssr: false) inside one.

import dynamic from "next/dynamic";
import Link from "next/link";
import type { OverviewMessages } from "../constants";

// Render the iframe client-only to avoid SSR/CSR markup drift
const ClientScene = dynamic(
  () =>
    Promise.resolve(function ClientScene({ src }: { src: string }) {
      return (
        <iframe
          src={src}
          title="ArcGIS 3D scene"
          className="w-full h-[420px] md:h-[520px] rounded-md"
          allowFullScreen
          loading="lazy"
        />
      );
    }),
  { ssr: false }
);

export default function SceneEmbed({ intro }: { intro: OverviewMessages["intro"] }) {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 text-center mb-2">
          {intro.title ?? ""}
        </h2>
        <p className="text-center text-sm md:text-base text-gray-700 mb-6">
          {intro.description ?? " "}
          {intro.linkHref && intro.linkText ? (
            <>
              {" "}
              <Link href={intro.linkHref} className="text-blue-600 underline">
                {intro.linkText}
              </Link>
              .
            </>
          ) : null}
        </p>

        <div className="mx-auto max-w-[1000px]">
          <ClientScene src={intro.embedUrl} />
        </div>
      </div>
    </section>
  );
}
