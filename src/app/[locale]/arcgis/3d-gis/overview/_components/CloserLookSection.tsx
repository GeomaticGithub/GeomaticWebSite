"use client";
// Client component: Next.js 15 only allows a browser-only block (ssr: false) inside one.

import type { OverviewMessages } from "../constants";
import dynamic from "next/dynamic";

const ClientVideo = dynamic(
  () =>
    Promise.resolve(function ClientVideo({ title }: { title: string }) {
      return (
        <iframe
          width="720"
          height="500"
          src="https://www.esri.com/videos/iframe?videoid=JYkNBY7xuRo"
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="object-cover w-full"
          loading="lazy"
        />
      );
    }),
  { ssr: false }
);

export default function CloserLookSection({ closer }: { closer: OverviewMessages["closerLook"] }) {
  return (
    <section className="bg-[#f5f5f5]">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <h4 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
          {closer.title}
        </h4>
        <div className="relative mx-auto w-full max-w-[900px] h-full">
            <ClientVideo title={closer.title} />
          {/* <Image src={closer.image} alt={closer.imageAlt} fill className="object-cover rounded-md" /> */}
        </div>
      </div>
    </section>
  );
}
