import Image from "next/image";
import Link from "next/link";
import type { IndoorsMessages } from "../constants";

export default function IPS({ data }: { data: IndoorsMessages["ips"] }) {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto grid gap-8 lg:grid-cols-2 items-center">
        <div className="relative h-[600px] overflow-hidden bg-white">
          <Image src={data.leftImage} alt="" fill className="object-cover" />
        </div>
        <div className="w-3/4 flex flex-col gap-4" >
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {data.heading}
          </h3>
          <p className="text-gray-700">{data.desc1}</p>
          <p className="text-gray-700">{data.desc2}</p>
          <Link
            href={data.learnMore.href}
            className="w-fit px-4 py-[4px] text-blue-700 ring-1 ring-blue-700 hover:bg-blue-50"
          >
            {data.learnMore.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
