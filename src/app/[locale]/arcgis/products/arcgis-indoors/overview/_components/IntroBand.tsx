import type { IndoorsMessages } from "../constants";

export default function IntroBand({
  data,
}: {
  data: IndoorsMessages["intro"];
}) {
  return (
    <section className="bg-[#1d4ed8] text-white">
      <div className="flex flex-col gap-2 mx-auto max-w-[1440px] px-6 py-24">
        <p className="max-w-2xl text-white/95 leading-relaxed">
          {data.paragraph}
        </p>
      </div>
    </section>
  );
}
