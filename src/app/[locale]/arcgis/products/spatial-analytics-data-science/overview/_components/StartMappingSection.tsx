import Link from "next/link";

export default function StartMappingSection({
  data,
  locale,
  contact,
}: {
  data: any;
  locale: string;
  contact: { title: string; desc: string; cta: string };
}) {
  return (
    <section className="mt-6">
      <div className="h-[400px] flex items-center justify-center bg-[#323232] text-white">
        <div className="max-w-[1440px] mx-auto px-6 flex flex-col items-center gap-6">
          <div className="flex flex-col gap-3 items-center">
            <h2 className="md:w-full text-center font-bold text-4xl">{contact.title}</h2>
            <div className="h-[4px] bg-blue-400 w-14" />
          </div>
          <p className="md:w-1/2 text-center text-lg">
            {contact.desc}
          </p>
          <Link href={`/${locale}/about-geomatic/contact`} className="py-3 px-6 bg-[#0079c1] hover:bg-[#005e95] text-white rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white">{contact.cta}</Link>
        </div>
      </div>
    </section>
  );
}
