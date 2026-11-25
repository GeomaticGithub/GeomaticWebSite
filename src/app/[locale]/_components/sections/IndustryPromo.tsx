"use client";

type IndustryPromoMsgs = {
  imgAlt: string;
  title: string;
  body: string;
  cta: string;
  link: string;
};

export default function IndustryPromo({ data }: { data: IndustryPromoMsgs }) {
  const bg = "/sop-st-geospatial-awakening-bg.jpg";
  const framed = "/1.jpeg";

  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <div
        className="
          relative mx-auto
          w-[85%] lg:w-full lg:max-w-[1440px]
          px-0 lg:px-16
          py-20 lg:py-32
          grid gap-10 lg:gap-12 items-center
          lg:grid-cols-2
        "
      >
        <div className="order-2 lg:order-1">
          <div className="relative w-full lg:max-w-xl">
            <div className="absolute -inset-6 bg-white/70 blur-lg rounded-2xl" />
            <img
              src={framed}
              alt={data.imgAlt}
              loading="lazy"
              className="relative block w-full h-auto"
            />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <h3
            className="font-semibold leading-tight"
            style={{ fontSize: "clamp(22px, 3.5vw, 40px)" }}
          >
            {data.title}
          </h3>
          <p className="mt-4 text-slate-700 lg:max-w-lg">{data.body}</p>
          <a
            href={data.link}
            className="inline-flex items-center mt-6 bg-[#0079c1] hover:bg-[#005e95] text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0079c1] px-5 py-2.5 text-sm font-medium"
          >
            {data.cta} <span className="ml-2" aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
