import Link from "next/link";
import type { AnalyzeMsgs } from "../constants";

export default function DuoCTA({ duo }: { duo: AnalyzeMsgs["duoCta"] }) {
  return (
    <section className="bg-[#1a1a1a] text-white">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 px-6 py-12 md:grid-cols-2">
        <div className="border border-white/15 rounded-md p-6">
          <h5 className="text-lg font-semibold mb-2">{duo.left.title}</h5>
          <Link href={duo.left.href} className="inline-block mt-2 bg-blue-600 px-4 py-2 rounded">
            {duo.left.button}
          </Link>
        </div>
        <div className="border border-white/15 rounded-md p-6">
          <h5 className="text-lg font-semibold mb-2">{duo.right.title}</h5>
          <Link href={duo.right.href} className="inline-block mt-2 bg-blue-600 px-4 py-2 rounded">
            {duo.right.button}
          </Link>
        </div>
      </div>
    </section>
  );
}
