import Image from "next/image";
import type { WhatIsGisMessages } from "../constants";

export default function BottomCtas({
  data,
}: {
  data: WhatIsGisMessages["bottomCtas"];
}) {
  return (
    <section className="bg-indigo-800 text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-10 pb-24 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {data.items.map((c, i) => (
          <div key={i} className="flex flex-col gap-2 p-5">
            <Image
              src={c.icon}
              alt=""
              width={64}
              height={64}
            />
            <div className="font-semibold">{c.title}</div>
            <p className="text-white/85 text-sm">{c.body}</p>
            <a href={c.href} className="inline-block underline decoration-blue-400 text-blue-400">
              {c.linkText}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
