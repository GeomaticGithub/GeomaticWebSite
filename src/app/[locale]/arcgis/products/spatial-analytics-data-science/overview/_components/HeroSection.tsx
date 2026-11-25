"use client";

import Image from "next/image";
import dynamic from "next/dynamic";

const backgroundBanner = "/fieldOperations/overview-banner-background.jpg";
const layerstackBanner = "/mapping/overview-banner-layerstack.png";

interface HeroSectionProps {
  hero: { title: string; subtitle?: string; subtitle1?: string; subtitle2?: string };
  intro: { paragraph?: string };
  videoBlock: { title: string; desc: string };
}

const ClientVideo = dynamic(
  () =>
    Promise.resolve(function ClientVideo({ title }: { title: string }) {
      return (
        <iframe
          width="720"
          height="600"
          src="https://www.esri.com/videos/iframe?videoid=XrU8GX7manc"
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-[400px] lg:h-[600px] object-cover"
          loading="lazy"
        />
      );
    }),
  { ssr: false }
);

export default function HeroSection({ hero, intro, videoBlock }: HeroSectionProps) {
  const title = hero.title ?? "";
  const subtitle1 = hero.subtitle1 ?? hero.subtitle ?? ""; // JSON uses "subtitle"
  const subtitle2 = hero.subtitle2 ?? "";
  const paragraph = intro.paragraph ?? "";

  return (
    <section>
      <div className="relative h-[500px] md:h-[645px]">
        <Image
          src={backgroundBanner}
          alt=""
          width={1440}
          height={645}
          className="h-full w-full object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center px-6 lg:grid-cols-2">
            <div className="text-left text-white">
              <h1 className="text-4xl font-bold mb-2">{title}</h1>
              <div className="max-w-xl">
                <p className="text-lg mb-2 leading-relaxed text-gray-200">
                  {subtitle1}
                </p>
              </div>
              <div className="max-w-xl">
                <p className="mb-2 leading-relaxed">{subtitle2}</p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image
                src={layerstackBanner}
                alt=""
                width={700}
                height={700}
                className="w-80 h-80 md:h-[500px] md:w-[500px] lg:h-[700px] lg:w-[700px] object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white text-black flex items-center justify-center py-12">
        <div className="max-w-[1440px] mx-auto px-6">
          <p className="md:w-1/2">{paragraph}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 items-center bg-[#F3F3F3]">
        <div className="w-full order-2 lg:order-1">
          <ClientVideo title={videoBlock.title} />
        </div>
        <div className="max-w-[1440px] mx-auto px-4 pl-8 lg:pl-20 lg:pr-20 flex items-center order-1 lg:order-2">
          <div className="text-left py-8 lg:py-0">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-gray-900">
              {videoBlock.title}
            </h2>
            <p className="text-sm lg:text-base leading-relaxed mb-4 lg:mb-6 text-[#4A4A4A]">
              {videoBlock.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
