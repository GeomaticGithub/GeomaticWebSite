import Image from "next/image";
import Link from "next/link";
import type { PowerBIMessages } from "../constants";

export default function MicrosoftGrid({
  data,
}: {
  data: PowerBIMessages["msGrid"];
}) {
  return (
    <section className="bg-[#F2C812] w-full text-black">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="">
            <Link
              href={data.tiles[0].cta.href}
              className="group block relative h-[200px] lg:h-[400px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={data.tiles[0]?.image}
                alt={data.tiles[0]?.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-end justify-start p-6 transition-opacity duration-300 group-hover:opacity-0 bg-black/30">
                <h4 className="text-xl lg:text-2xl text-center text-white">
                  {data.tiles[0]?.title}
                </h4>
              </div>

              <div className="absolute inset-0 bg-white/95 flex flex-col gap-2 justify-center p-6 px-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h4 className="text-xl lg:text-2xl font-bold text-gray-900 w-1/2">
                  {data.tiles[0].titleAlt}
                </h4>
                <p className="text-gray-700 w-1/2">
                  {data.tiles[0].descAlt}
                </p>
                <p
                  className="text-sm text-blue-600 hover:underline"
                >
                  {data.tiles[0].cta.label}
                </p>
              </div>
            </Link>

            <div className="grid grid-cols-2">
              {data.tiles.slice(1, 3).map((tile, i) => (
                <Link
                  key={i}
                  href={tile.cta.href}
                  className="group block relative h-[200px] lg:h-[400px] overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Image
                    src={tile.image}
                    alt={tile.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-end justify-start p-4 transition-opacity duration-300 group-hover:opacity-0 bg-black/30">
                    <h4 className="lg:text-lg text-white text-center">
                      {tile.title}
                    </h4>
                  </div>

                  <div className="absolute inset-0 bg-white/95 flex flex-col gap-2 items-center justify-center p-4 px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="text-base lg:text-lg font-bold text-gray-900 w-full">
                      {tile.titleAlt}
                    </h4>
                    <p className="text-sm text-gray-700 ">{tile.descAlt}</p>
                    <p
                      className="text-sm text-blue-600 hover:underline w-full"
                    >
                      {tile.cta.label}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6 lg:pl-8">
            <div className="space-y-2">
              <h2 className="text-3xl lg:text-4xl xl:text-4xl font-semibold leading-tight text-gray-900">
                {data.heading}
              </h2>
              <p className="leading-relaxed w-4/5 text-gray-900/90">
                {data.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
