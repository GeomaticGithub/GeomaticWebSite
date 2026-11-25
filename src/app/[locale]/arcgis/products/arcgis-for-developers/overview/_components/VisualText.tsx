import Image from "next/image";
import type { DevOverviewMessages } from "../constants";

export default function VisualText({
  block,
}: {
  block: DevOverviewMessages["visualText"];
}) {
  return (
    <section className="relative  min-h-[600px]">
      {/* Background image covering entire section */}
      <div className="absolute inset-0 z-0">
        <Image
          src={block.bgGraphic}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 py-12">
        <div className="relative h-[320px] md:h-[380px] lg:h-[500px]">
          <iframe
            className="w-full h-full rounded-lg"
            src="https://www.youtube.com/embed/AMXeD5f36Os?si=nSsHBn96_QGDp4rD"
            title={block.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
          {/* <div className="absolute inset-0 ring-1 ring-black/5 rounded" /> */}
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {block.title}
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            {block.paragraph}
          </p>
        </div>
      </div>
    </section>
  );
}
