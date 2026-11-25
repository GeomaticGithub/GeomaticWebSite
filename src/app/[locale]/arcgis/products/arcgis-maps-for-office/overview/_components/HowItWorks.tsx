import type { OfficeMessages } from "../constants";

export default function HowItWorks({ data }: { data: OfficeMessages["how"] }) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-12">
        <h3 className="text-2xl md:text-4xl font-semibold text-center text-gray-900">
          {data.title}
        </h3>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {data.steps.map((s, i) => (
            <div key={i} className="flex flex-col gap-2 p-5">
              <h2 className="text-2xl text-gray-900 rounded-full border-[1px] border-[#217245] w-12 h-12 flex items-center justify-center">{i + 1}</h2>
              <div className="font-semibold text-gray-900">{s.title}</div>
              <p className="text-gray-700">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
