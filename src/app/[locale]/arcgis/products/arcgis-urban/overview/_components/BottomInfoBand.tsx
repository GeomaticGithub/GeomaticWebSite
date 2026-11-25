import Image from "next/image";
import type { UrbanOverviewMessages } from "../constants";
import Link from "next/link";

export default function BottomInfoBand({
  data,
}: {
  data: UrbanOverviewMessages["bottomInfo"];
}) {
  return (
    <section className="bg-[#1fa5d7] relative overflow-hidden">
      {/* Background overlay image */}
      <Image
        src="/arcgisUrban/urban-banner-bg.jpg"
        alt=""
        fill
        className="absolute inset-0 z-0 object-cover opacity-40"
      />

      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 text-white relative z-20">
        <Link
          href={data.leftLink}
          className="group py-28 flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 bg-blue-600/70 hover:bg-blue-500/80 active:bg-blue-400/90 hover:scale-105 active:scale-105 backdrop-blur-sm"
        >
          <img
            src={data.leftImage}
            alt={data.leftTitle}
            className="w-12 h-12"
          />
          <div className="text-lg font-semibold">{data.leftTitle}</div>
          <p className="opacity-95">{data.leftDesc}</p>
        </Link>
        <Link
          href={data.rightLink}
          className="group py-28 flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 bg-blue-700/70 hover:bg-blue-600/80 active:bg-blue-500/90 hover:scale-105 active:scale-105 backdrop-blur-sm"
        >
          <img
            src={data.rightImage}
            alt={data.rightTitle}
            className="w-12 h-12"
          />
          <div className="text-lg font-semibold">{data.rightTitle}</div>
          <p className="opacity-95">{data.rightDesc}</p>
        </Link>
      </div>
    </section>
  );
}
