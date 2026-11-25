import type { ExcaliburMessages } from "../constants";

export default function HowItWorks({
  data,
}: {
  data: ExcaliburMessages["how"];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 pt-12 pb-24">
        <h3 className="text-center text-2xl md:text-3xl font-semibold text-gray-900">
          {data.title}
        </h3>
        <div className="mt-8 grid gap-10 md:grid-cols-4">
          {data.steps.map((s, i) => (
            <div key={i} className="flex flex-col gap-6">
              <div className="text-6xl font-semibold text-gray-900">{s.number}</div>
              <div className="flex flex-col gap-2">
                <div className="font-semibold text-gray-900 text-xl">{s.title}</div>
                <p className="text-gray-700 mt-1 text-sm">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="mt-10 grid md:grid-cols-2 gap-8">
          <div></div>
          <div>
            <div className="font-semibold text-gray-900">{data.noteTitle}</div>
            <p className="text-gray-700 mt-1">{data.noteDesc}</p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
