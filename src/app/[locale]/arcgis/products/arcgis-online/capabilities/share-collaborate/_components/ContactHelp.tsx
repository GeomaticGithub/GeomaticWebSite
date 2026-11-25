import Link from "next/link";
import type { ShareCollabMsgs } from "../constants";

export default function ContactHelp({
  help,
}: {
  help: ShareCollabMsgs["help"];
}) {
  return (
    <section className="bg-[#121212] text-white">
      <div className="h-[400px] flex items-center justify-center">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex flex-col gap-3 items-center">
            <h1 className="md:w-full text-center font-bold text-4xl">
              {help.heading}
            </h1>
            <div className="h-[4px] bg-blue-400 w-32"></div>
          </div>
          <p className="md:w-3/4 text-center text-lg">{help.subHeading}</p>
          <Link
            href={help.link}
            className="py-3 px-6 bg-blue-500 text-white rounded-md"
          >
            {help.href}
          </Link>
        </div>
      </div>
    </section>
  );
}
