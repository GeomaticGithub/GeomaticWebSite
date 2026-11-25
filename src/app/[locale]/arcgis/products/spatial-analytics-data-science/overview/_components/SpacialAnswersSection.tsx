import Link from "next/link";

export default function SpacialAnswersSection({ data }: { data: any }) {
  const { title, subtitle, ...cards } = data;
  const entries = Object.entries(cards); // stable order for JSON

  return (
    <section className="bg-[#f8f8f8]">
      <div className="max-w-[1440px] mx-auto">
        <div className="px-6 py-12 text-center text-black">
          <h2 className="text-3xl font-bold mb-6">{title ?? ""}</h2>
          <p className="text-base leading-relaxed max-w-4xl mx-auto">
            {subtitle ?? ""}
          </p>
        </div>

        <div className="px-6 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {entries.map(([key, c]: any) => {
              // Only render a link when the card has a real destination; "#" placeholders
              // made every card look clickable while leading nowhere.
              const hasLink = typeof c.href === "string" && c.href !== "" && c.href !== "#";
              const Wrapper: any = hasLink ? Link : "div";
              return (
              <Wrapper
                {...(hasLink ? { href: c.href } : {})}
                key={key} // use object key, not index
                className={`bg-white shadow-lg overflow-hidden h-full flex flex-col ${
                  hasLink
                    ? "hover:border-[#009AF2] hover:border-l-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#009AF2]"
                    : ""
                }`}
              >
                <div className="p-6 flex flex-col flex-grow gap-2 text-black">
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width={50}
                    height={50}
                  >
                    <path d="M16.507 10.1a5.4 5.4 0 1 0 5.4 5.4..." />
                  </svg>
                  <h4 className="text-lg font-semibold">{c.title ?? ""}</h4>
                  <p className="text-sm leading-relaxed">{c.desc ?? ""}</p>
                </div>
              </Wrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
