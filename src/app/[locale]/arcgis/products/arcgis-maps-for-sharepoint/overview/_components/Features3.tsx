import Image from "next/image";
import type { SharePointMessages } from "../constants";
import Link from "next/link";

export default function Features3({
  data,
}: {
  data: SharePointMessages["features"];
}) {
  return (
    <section className="">
      <div className="flex flex-col gap-6 mx-auto max-w-[1200px] px-6 pt-12 pb-24">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
            {data.title}
          </h3>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {data.items.map((f, i) => (
            <article
              key={i}
              className=""
            >
              <div className="relative h-[180px] w-full">
                <Image src={f.image} alt="" fill className="object-cover" />
              </div>
              <div className="flex flex-col" >
                <div className="p-5 flex flex-col gap-2">
                  <div className="text-xl font-semibold text-gray-900">
                    {f.title}
                  </div>
                  <p className="text-sm text-gray-700">{f.desc}</p>
                </div>
                <Link
                  href={f.cta.href}
                  className="px-5 text-blue-600 underline "
                >
                  {f.cta.label}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
