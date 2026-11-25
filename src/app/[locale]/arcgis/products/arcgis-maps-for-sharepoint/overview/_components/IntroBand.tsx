import type { SharePointMessages } from "../constants";

export default function IntroBand({
  data,
}: {
  data: SharePointMessages["intro"];
}) {
  return (
    <section className="bg-[#00B9FF] text-black">
      <div className="flex flex-col gap-2 mx-auto max-w-[1440px] px-6 py-36">
        <p className="max-w-2xl leading-relaxed">{data.paragraph}</p>
      </div>
    </section>
  );
}
