import Image from "next/image";
import Link from "next/link";
import type { SharePointMessages } from "../constants";

export default function MicrosoftGrid({
  data,
}: {
  data: SharePointMessages["msGrid"];
}) {
  return (
    <section className="bg-[#0079C1] w-full text-white">
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-6 w-full h-full px-6 lg:p-16">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl xl:text-4xl font-semibold leading-tight text-white">
                {data.heading}
              </h2>
              <p className="leading-relaxed w-4/5 text-white/90">{data.desc}</p>
            </div>
          </div>

          <div className="">
            {data.tiles.map((tile, i) => (
              <Link
                key={i}
                href={tile.cta.href}
                className="group block relative h-[200px] lg:h-[400px]"
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

                <div className="absolute inset-0 bg-black/80 flex flex-col gap-2 items-center justify-center p-4 px-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h4 className="text-base lg:text-lg font-bold text-white w-full">
                    {tile.titleAlt}
                  </h4>
                  <p className="text-sm text-white">{tile.descAlt}</p>
                  <p className="text-sm text-white underline w-full">
                    {tile.cta.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
