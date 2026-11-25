import Image from "next/image";
import type { ShareCollabMsgs } from "../constants";

export default function QuoteBand({
  quote,
}: {
  quote: ShareCollabMsgs["quote"];
}) {
  return (
    <section className="relative text-white">
      <div className="relative h-[300px] md:h-[400px]">
        <Image src={quote.bgGraphic} alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-[#0b1b4a]/50" />
      </div>

      <div className="absolute inset-0 flex items-center">
        <div className="mx-auto w-full max-w-[1200px] px-6">
          <blockquote className="max-w-3xl flex flex-col">
            <svg
              className="w-12 h-12 mb-4 fill-white opacity-80"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 64 64"
              enableBackground="new 0 0 64 64"
              xmlSpace="preserve"
            >
              <g>
                <path d="M62,16.9224243V7.2230225c-9.9628906,0-18.6026611,5.6433105-22.9127197,13.9044189 c-1.8622437,3.569397-2.9210205,7.6246338-2.9210205,11.9293213V56h18.541626C58.7352295,56,62,52.7352295,62,48.7078857 V33.0570068H45.8654785C45.8654785,24.1460571,53.0891724,16.9224243,62,16.9224243z"></path>
                <path d="M5.0872803,21.1274414c-1.8622437,3.569397-2.9210205,7.6246338-2.9210205,11.9293213V56h18.541626 C24.7352295,56,28,52.7352295,28,48.7078857V33.0570068H11.8654785c0-8.9109497,7.2236938-16.1345825,16.1345215-16.1345825 V7.2230225C18.0371094,7.2230225,9.3973389,12.866333,5.0872803,21.1274414z"></path>
              </g>
            </svg>
            <p className="text-xl md:text-2xl leading-relaxed">
              "{quote.text}"
            </p>
            <footer className="mt-6 text-white/80 text-sm flex flex-col gap-2">
              <div>{quote.author}</div>
              <div>{quote.role}</div>
            </footer>
          </blockquote>
        </div>
      </div>
    </section>
  );
}
