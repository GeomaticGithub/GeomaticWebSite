import type { MissionMessages } from "../constants";

type Tile = MissionMessages["platform"]["tiles"][number];

/**
 * Reveal tile: shows the title, and the detail text on hover, keyboard focus or tap.
 * These tiles have no destination page, so they are not links (they used href="#").
 * tabIndex makes the hidden detail reachable by keyboard and by tap on touch screens.
 */
function RevealTile({ tile, large }: { tile: Tile; large?: boolean }) {
  return (
    <div
      tabIndex={0}
      className={`group block relative h-[200px] lg:h-[400px] bg-gradient-to-br from-purple-600 to-purple-800 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white`}
    >
      <div
        aria-hidden
        className={`absolute inset-0 flex items-center justify-center ${large ? "p-6" : "p-4"} transition-opacity duration-300 group-hover:opacity-0 group-focus:opacity-0`}
      >
        <h4
          className={
            large
              ? "text-2xl lg:text-3xl font-bold text-center"
              : "text-lg lg:text-xl font-bold text-center"
          }
        >
          {tile?.title}
        </h4>
      </div>

      <div
        className={`absolute inset-0 bg-white/95 flex flex-col items-center justify-center ${large ? "p-6" : "p-4"} px-10 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300`}
      >
        <h4
          className={
            large
              ? "text-xl lg:text-2xl font-bold text-gray-900 mb-4 w-full"
              : "text-base lg:text-lg font-bold text-gray-900 mb-3 w-full"
          }
        >
          {tile?.titleAlt}
        </h4>
        <p className={large ? "text-gray-700 leading-relaxed" : "text-sm text-gray-700"}>
          {tile?.descAlt}
        </p>
      </div>
    </div>
  );
}

export default function PlatformTiles({
  data,
}: {
  data: MissionMessages["platform"];
}) {
  return (
    <section className="bg-[#8530bf] w-full text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <RevealTile tile={data.tiles[0]} large />

          <div className="grid grid-cols-2">
            {/* Each tile now shows its own detail text (previously tiles 2 and 3 showed tiles 1 and 2's text). */}
            {data.tiles.slice(1, 3).map((tile, i) => (
              <RevealTile key={i} tile={tile} />
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-6 lg:pl-8">
          <div className="space-y-4">
            <h2 className="text-3xl lg:text-4xl xl:text-4xl font-semibold leading-tight">
              {data.heading}
            </h2>
            <p className="leading-relaxed w-4/5">{data.desc}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
