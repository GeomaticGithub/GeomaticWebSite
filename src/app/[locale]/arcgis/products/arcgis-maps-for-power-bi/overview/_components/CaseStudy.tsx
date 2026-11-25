import Image from "next/image";
import Link from "next/link";
import type { PowerBIMessages } from "../constants";

export default function CaseStudy({ data }: { data: PowerBIMessages["caseStudy"] }) {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <Image src={data.image} alt="" fill className="object-cover" />
      </div>
      <div className="relative mx-auto max-w-[1100px] py-80">
        <div className="mx-auto bg-gray-900/85 p-8 py-24 text-center text-white">
          <div className="text-xs uppercase tracking-wider text-white/70">
            {data.eyebrow}
          </div>
          <h4 className="mt-1 text-2xl md:text-3xl font-semibold">{data.title}</h4>
          <p className="mt-2 text-white/90">{data.desc}</p>
          <Link
            href={data.cta.href}
            className="mt-6 inline-flex bg-white px-4 py-[2px] text-gray-900 hover:bg-gray-200"
          >
            {data.cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
