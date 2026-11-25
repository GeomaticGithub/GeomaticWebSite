import Image from "next/image";
import { RiMailSendLine, RiPhoneLine } from "react-icons/ri";
import { FORM_ID, telHref, type ContactInfo, type ContactPageT } from "../constants";

const ring =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b4f86]";

export default function Hero({
  data,
  contact,
}: {
  data: ContactPageT["hero"];
  contact: ContactInfo;
}) {
  const phone = contact.phones[0];

  return (
    <section className="relative isolate overflow-hidden bg-[#0b4f86] text-white">
      {/* Brand banner (blue contour lines); darkened on the text side so white text stays readable */}
      <Image
        src={data.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#07335c] via-[#07335c]/80 to-[#07335c]/10"
        aria-hidden
      />

      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:px-6 lg:py-24">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-sky-200">
            <span className="h-[3px] w-8 rounded-full bg-[#5fd0ff]" aria-hidden />
            {data.kicker}
          </p>
          <h1 className="mt-4 text-[38px] font-bold leading-[1.05] sm:text-[52px]">
            {data.title}
          </h1>
          <p className="mt-5 text-[18px] leading-relaxed text-white/90">
            {data.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`#${FORM_ID}`}
              className={`inline-flex items-center justify-center gap-2 bg-white px-6 py-3.5 text-[15px] font-semibold text-[#005e95] transition-colors hover:bg-slate-100 ${ring}`}
            >
              <RiMailSendLine className="h-5 w-5" aria-hidden />
              {data.formCta}
            </a>
            <a
              href={telHref(phone)}
              className={`inline-flex items-center justify-center gap-2 whitespace-nowrap border border-white/80 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 ${ring}`}
            >
              <RiPhoneLine className="h-5 w-5" aria-hidden />
              {data.callCta.replace("{phone}", phone)}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
