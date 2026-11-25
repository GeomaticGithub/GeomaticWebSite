"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function getCurrentLocaleFromPath(pathname: string): string {
  const seg = pathname.split("/")[1];
  return /^[a-z]{2}-[a-z]{2}$/i.test(seg) ? seg : "en-ma";
}

type Props = {
  data: {
    title: string;
    cards: {
      title: string;
      desc?: string;
      image?: string;
      gradient: string;
      link: string;
      cta?: string;
    }[];
  };
};

export default function Community({ data }: Props) {
  const pathname = usePathname();
  const locale = getCurrentLocaleFromPath(pathname);

  // Function to create variable grid layout (2-5 columns per row)
  const createDynamicRows = (cards: typeof data.cards) => {
    const rows = [];
    let currentIndex = 0;

    // Define a pattern for column distribution (repeating cycle for consistency)
    const columnPattern = [3, 4, 2, 5, 3, 4, 2, 3, 5, 2]; // Will cycle through this pattern
    let patternIndex = 0;

    while (currentIndex < cards.length) {
      const remainingCards = cards.length - currentIndex;

      // Get next column count from pattern, but don't exceed remaining cards
      let columnsInThisRow = columnPattern[patternIndex % columnPattern.length];
      if (columnsInThisRow > remainingCards) {
        columnsInThisRow = remainingCards;
      }

      // Get cards for this row
      const rowCards = cards.slice(
        currentIndex,
        currentIndex + columnsInThisRow
      );
      rows.push({ cards: rowCards, columns: columnsInThisRow });

      currentIndex += columnsInThisRow;
      patternIndex++;
    }

    return rows;
  };

  const dynamicRows = createDynamicRows(data.cards);

  return (
    <section className="bg-white">
      <div className="mx-auto">
        {/* Mobile and tablet: continuous grid to avoid empty spaces */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:hidden">
          {data.cards.map((c, cardIndex) => (
            <Link
              key={cardIndex}
              href={c.link.startsWith("http") ? c.link : `/${locale}${c.link}`}
              target={c.link.startsWith("http") ? "_blank" : undefined}
              className="group relative h-28 md:h-32 overflow-hidden hover:ring-2 hover:ring-slate-400 transition-all duration-300 hover:shadow-lg"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${c.gradient} group-hover:scale-105 transition-transform duration-300`}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
              <div className="relative z-10 h-full w-full flex items-center px-5">
                <h3 className="text-base md:text-lg font-semibold text-white drop-shadow group-hover:text-white/90 transition-colors duration-300">
                  {c.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* Large screens: dynamic row layout */}
        <div className="hidden lg:block">
          {dynamicRows.map((row, rowIndex) => {
            let gridClass = "grid ";

            switch (row.columns) {
              case 2:
                gridClass += "grid-cols-2";
                break;
              case 3:
                gridClass += "grid-cols-3";
                break;
              case 4:
                gridClass += "grid-cols-4";
                break;
              case 5:
                gridClass += "grid-cols-5";
                break;
              default:
                gridClass += "grid-cols-3";
            }

            return (
              <div key={rowIndex} className={gridClass}>
                {row.cards.map((c, cardIndex) => (
                  <Link
                    key={`${rowIndex}-${cardIndex}`}
                    href={
                      c.link.startsWith("http") ? c.link : `/${locale}${c.link}`
                    }
                    target={c.link.startsWith("http") ? "_blank" : undefined}
                    className="group relative h-28 md:h-32 lg:h-36 overflow-hidden hover:ring-2 hover:ring-slate-400 transition-all duration-300 hover:shadow-lg"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${c.gradient} group-hover:scale-105 transition-transform duration-300`}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="relative z-10 h-full w-full flex items-center px-5">
                      <h3 className="text-base md:text-lg font-semibold text-white drop-shadow group-hover:text-white/90 transition-colors duration-300">
                        {c.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
