"use client";

type Props = {
  data: {
    phoneText: string;
    emailText: string;
    title: string;
    subTitle: string;
    bgGraphic: string;
    paragraph: string;
    email?: string;
    phone?: string;
  };
};

export default function Intro({ data }: Props) {
  return (
    <section className="relative">
      {/* orange band */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600">
        <div className="flex flex-col gap-8 mx-auto max-w-7xl px-4 py-16 pb-20 text-white">
          <h2 className="text-xl md:text-3xl font-semibold">{data.title}</h2>
          <div className="pt-8">
            <p className="opacity-90">{data.subTitle}</p>
            <p className="max-w-3xl">{data.paragraph}</p>
          </div>

          <div className="flex flex-col gap-6 text-sm ">
            <div>
              <div className="opacity-75">{data.emailText}</div>
              <a
                className="underline underline-offset-4 hover:no-underline"
                href={`mailto:${data.email}`}
              >
                {data.email}
              </a>
            </div>
            <div>
              <div className="opacity-75">{data.phoneText}</div>
              <a
                className="underline underline-offset-4 hover:no-underline"
                href={data.phone ? `tel:${data.phone.replace(/\s+/g, "")}` : undefined}
              >
                {data.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
