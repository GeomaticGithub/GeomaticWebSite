import Image from "next/image";
import type { HubOverviewMessages } from "../constants";
import Link from "next/link";

export default function SitesGrid({ data }: { data: HubOverviewMessages["sites"] }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-900">
          {data.title}
        </h2>
        <div className="mt-4">
          <p className="text-center text-gray-700 w-1/2 mx-auto">
            {data.desc}
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.cards.map((c, i) => (
            <Link
              href={c.link}
              key={i} className="rounded-lg overflow-hidden ring-1 ring-gray-200 bg-white hover:shadow-lg hover:ring-gray-300 transition-shadow duration-300"
            >
              <div className="relative h-44">
                <Image src={c.image} alt="" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{c.title}</h3>
                <p className="mt-2 text-sm text-gray-700">{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
