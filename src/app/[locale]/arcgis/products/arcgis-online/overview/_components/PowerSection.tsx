import Image from "next/image";
import type { AOOverviewMessages } from "../constants";

export default function PowerSection({ power }: { power: AOOverviewMessages["power"] }) {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-10">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
          {power.title}
        </h2>
        <div className="relative mx-auto h-[240px] md:h-[400px] w-full max-w-[900px]">
          <Image src={power.image} alt={power.imageAlt} fill className="object-cover rounded-md" />
        </div>
      </div>
    </section>
  );
}
