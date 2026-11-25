import Image from "next/image";
import type { OverviewMessages } from "../constants";

const Icon = ({ name }: { name: string }) => {
  // simple inline SVGs (no external deps, SSR-safe)
  switch (name) {
    case "cube":
      return (
        <svg
          viewBox="0 0 24 24"
          width="36"
          height="36"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            fill="currentColor"
            d="M11.1 1.7l-7.5 3.4c-.4.2-.6.5-.6.9v7c0 .4.2.7.6.9l7.5 3.4c.3.1.6.1.9 0l7.5-3.4c.4-.2.6-.5.6-.9v-7c0-.4-.2-.7-.6-.9L12 1.7c-.3-.1-.6-.1-.9 0zM12 3l6.5 3-6.5 3-6.5-3L12 3zm-7 4.6l6 2.8v6.1l-6-2.8V7.6zm14 0v6.1l-6 2.8V10.4l6-2.8z"
          />
        </svg>
      );
    case "analyze":
      return (
        <svg
          viewBox="0 0 24 24"
          width="36"
          height="36"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            fill="currentColor"
            d="M3 3h2v18H3zM7 13h2v8H7zM11 9h2v12h-2zM15 5h2v16h-2zM19 1h2v20h-2z"
          />
        </svg>
      );
    case "visualize":
      return (
        <svg
          viewBox="0 0 24 24"
          width="36"
          height="36"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            fill="currentColor"
            d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 12a5 5 0 110-10 5 5 0 010 10z"
          />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      );
    case "share":
      return (
        <svg
          viewBox="0 0 24 24"
          width="36"
          height="36"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            fill="currentColor"
            d="M18 16a3 3 0 00-2.4 1.2l-6.8-3.4a3 3 0 000-3.6l6.8-3.4A3 3 0 1014 4a3 3 0 001.4.8l-6.8 3.4a3 3 0 100 6l6.8 3.4A3 3 0 1018 16z"
          />
        </svg>
      );
  }
};

export default function FeatureStrip({
  strip,
}: {
  strip: OverviewMessages["strip"];
}) {
  return (
    <section className="relative">
      {strip.bgImage ? (
        <>
          <div className="relative h-[240px] md:h-[280px]">
            <Image src={strip.bgImage} alt="" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="absolute inset-0" aria-hidden />
        </>
      ) : null}

      <div
        className={`relative ${
          strip.bgImage ? "-mt-[240px] md:-mt-[280px]" : ""
        }`}
      >
        <div className="mx-auto w-full max-w-[1200px] px-6 py-10 text-white">
          <h3 className="text-center text-2xl md:text-3xl font-semibold mb-8">
            {strip.title ?? ""}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {strip.items.map((item, idx) => (
              <div
                key={`${item.title}-${idx}`}
                className="flex flex-col items-center text-center"
              >
                <div className="text-white/90 mb-3">
                  <Icon name={item.icon} />
                </div>
                <div className="font-semibold">{item.title}</div>
                <p className="text-white/80 text-sm mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
