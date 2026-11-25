import Image from "next/image";
import type { HubOverviewMessages } from "../constants";

export default function TestimonialBand({
  data,
}: {
  data: HubOverviewMessages["testimonial"];
}) {
  return (
    <section
      className="bg-cover bg-center"
      style={{ backgroundImage: `url(${data.background})` }}
    >
      <div className="bg-[#5a38d6]/90">
        <div className="mx-auto max-w-[1440px] px-6 py-24 text-white">
          <div className="flex items-center gap-6">
            <div className="relative h-64 w-64 rounded-full overflow-hidden ring-2 ring-white/40 shrink-0">
              <Image src={data.avatar} alt="" fill className="object-cover" />
            </div>
            <div className="">
              <div className="flex items-start gap-4">
                <svg
                  className="w-8 h-8 text-white/60 flex-shrink-0 mt-1"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  fill="currentColor"
                >
                  <g>
                    <path
                      d="M62,16.9224243V7.2230225c-9.9628906,0-18.6026611,5.6433105-22.9127197,13.9044189
                      c-1.8622437,3.569397-2.9210205,7.6246338-2.9210205,11.9293213V56h18.541626C58.7352295,56,62,52.7352295,62,48.7078857
                      V33.0570068H45.8654785C45.8654785,24.1460571,53.0891724,16.9224243,62,16.9224243z"
                    ></path>
                    <path
                      d="M5.0872803,21.1274414c-1.8622437,3.569397-2.9210205,7.6246338-2.9210205,11.9293213V56h18.541626
                      C24.7352295,56,28,52.7352295,28,48.7078857V33.0570068H11.8654785c0-8.9109497,7.2236938-16.1345825,16.1345215-16.1345825
                      V7.2230225C18.0371094,7.2230225,9.3973389,12.866333,5.0872803,21.1274414z"
                    ></path>
                  </g>
                </svg>
                <p className="text-white/60 text-2xl leading-relaxed w-3/4">
                  "{data.quote}"
                </p>
              </div>
              <div className="mt-3 text-sm opacity-90 ml-12">
                <div className="text-lg font-semibold">{data.author}</div>
                <div className="text-lg font-thin">{data.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
