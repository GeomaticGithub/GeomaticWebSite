import Link from "next/link";

type DualPromoMsgs = {
  SpacialAnalysisTitle: string;
  SpacialAnalysisDesc: string;
  SpacialAnalysisHref: string;
  SpacialAnalysisCta: string;
  blogTitle: string;
  blogDesc: string;
  blogHref: string;
  blogCta: string;
};

export default function DualPromoStrip({ data }: { data: DualPromoMsgs }) {
  return (
    <section className="mt-6">
      <div className="grid md:grid-cols-2">
        <div className="relative block isolate overflow-hidden group transition duration-200 hover:ring-2 hover:ring-white/90 hover:ring-inset">
          <div className="bg-[linear-gradient(to_right,_#5F1BC2,_#2171EB)] bg-cover bg-left-bottom absolute inset-0 h-full w-full object-cover transition duration-200 group-hover:brightness-90" />
          <div className="relative z-10 px-8 lg:px-14 py-20 text-white flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-semibold text-center">
              {data?.SpacialAnalysisTitle ?? ""}
            </h1>
            <p className="text-center w-1/2">
              {data?.SpacialAnalysisDesc ?? ""}
            </p>
            <Link
              href={data?.SpacialAnalysisHref ?? "#"}
              className="text-center flex flex-row items-center gap-2 underline"
            >
              {data?.SpacialAnalysisCta ?? ""}
              <svg
                aria-hidden="true"
                className="svg"
                fill="currentColor"
                height="20"
                viewBox="0 0 16 16"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15 3.6L11.4 0H2v16h13zM14 15H3V1h7v4h4zm0-11h-3V1h.31L14 3.69z"></path>
              </svg>
            </Link>
          </div>
        </div>

        <div className="relative block isolate overflow-hidden group transition duration-200 hover:ring-2 hover:ring-white/90 hover:ring-inset">
          <div className="bg-[linear-gradient(to_right,_#5F1BC2,_#2171EB)] bg-cover bg-left-bottom absolute inset-0 h-full w-full object-cover transition duration-200 group-hover:brightness-90" />
          <div className="relative z-10 px-8 lg:px-14 py-20 text-white flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-semibold text-center">
              {data?.blogTitle ?? ""}
            </h1>
            <p className="text-center w-1/2">{data?.blogDesc ?? ""}</p>
            <Link
              href={data?.blogHref ?? "#"}
              className="text-center flex flex-row items-center gap-2 underline"
            >
              {data?.blogCta ?? ""}
              <svg
                aria-hidden="true"
                className="svg"
                fill="currentColor"
                height="20"
                viewBox="0 0 16 16"
                width="20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15 3.6L11.4 0H2v16h13zM14 15H3V1h7v4h4zm0-11h-3V1h.31L14 3.69z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
