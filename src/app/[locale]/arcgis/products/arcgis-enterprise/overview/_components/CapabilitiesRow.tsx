import Link from "next/link";
import type { EnterpriseOverviewMessages } from "../constants";

export default function CapabilitiesRow({ caps }: { caps: EnterpriseOverviewMessages["capabilities"] }) {
  return (
    <section className="bg-[#f3f3f3]">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 md:grid-cols-4 gap-6 px-6 py-20">
        {caps.items.map((item, i) => (
          <div key={i} className="rounded-md p-5">
            <div className="text-xl font-semibold text-gray-900">{item.title}</div>
            <p className="text-sm text-gray-600 mt-2">{item.desc}</p>
            {item.cta && item.href && (
              <Link href={item.href} className="inline-block mt-3 text-blue-600 underline">
                {item.cta}
              </Link>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
