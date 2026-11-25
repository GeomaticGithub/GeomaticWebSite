import Link from "next/link";
import type { OfficeMessages } from "../constants";
import Image from "next/image";

export default function MicrosoftStrip({
  data,
}: {
  data: OfficeMessages["ms"];
}) {
  return (
    <section className="bg-[#217346] w-full text-white">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col justify-center space-y-6">
            <div className="flex flex-col justify-center gap-2 mx-auto">
              <h2 className="text-3xl lg:text-4xl xl:text-4xl font-semibold leading-tight">
                {data.heading}
              </h2>
              <p className="leading-relaxed">{data.desc}</p>
            </div>
          </div>

          <div className="grid grid-cols-1">
            {data.tiles.map((tile, i) => (
              <Link
                key={i}
                href={tile.cta?.href || "#"}
                className="relative group block h-[200px] lg:h-[400px] bg-gradient-to-br from-emerald-600 to-emerald-800" //
              >
                {/* <Image
                  src={tile.image}
                  alt=""
                  fill
                  className="absolute inset-0 object-cover"
                /> */}
                <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
                  <h4 className="text-xl lg:text-2xl w-full h-full flex items-end justify-start pb-4 pl-4">
                    {tile.title}
                  </h4>
                </div>
                <div className="flex flex-col gap-2 absolute inset-0 bg-white/95 items-center justify-center p-6 px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-lg lg:text-xl font-bold text-gray-900 w-full">
                    {tile.titleAlt}
                  </h4>
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {tile.descAlt}
                  </p>
                  {tile.cta?.text && (
                    <p className="text-gray-700 leading-relaxed text-sm w-full underline">
                      {tile.cta.text}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
