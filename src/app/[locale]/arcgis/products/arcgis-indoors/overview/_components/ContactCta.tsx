import Image from "next/image";
import type { IndoorsMessages } from "../constants";
import Link from "next/link";

export default function ContactCta({
  data,
}: {
  data: IndoorsMessages["contact"];
}) {
  return (
    <section className="">
      <div className="h-[400px] flex items-center justify-center bg-[#323232] text-white">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex flex-col gap-3 items-center">
            <h1 className="md:w-full text-center font-bold text-4xl">
              {data.heading}
            </h1>
            <div className="h-[4px] bg-blue-400 w-14" />
          </div>
          <p className="md:w-1/2 text-center text-lg">
            {data.desc}
          </p>
          <Link
            href={data.link}
            className="py-3 px-6 bg-blue-500 text-white rounded-md"
          >
            {data.linkText}
          </Link>
        </div>
      </div>
    </section>
  );
}
