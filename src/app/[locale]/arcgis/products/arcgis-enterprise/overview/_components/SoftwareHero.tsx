import Image from "next/image";
import type { EnterpriseOverviewMessages } from "../constants";

export default function SoftwareHero({
  software,
}: {
  software: EnterpriseOverviewMessages["software"];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 pt-12 text-center">
        <h2 className="text-xl md:text-4xl font-semibold text-gray-900 w-1/2 mx-auto">
          {software.heading}
        </h2>
        <p className="text-gray-600 mt-1 mb-8">{software.subheading}</p>
        <Image
          src={software.image}
          alt={software.imageAlt}
          width={1200}
          height={900}
          className="mx-auto object-contain"
        />
      </div>
    </section>
  );
}
