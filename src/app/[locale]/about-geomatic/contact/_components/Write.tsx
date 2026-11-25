import ContactForm from "./ContactForm";
import Details from "./Details";
import { FORM_ID, type ContactInfo, type ContactPageT } from "../constants";

/** "Write to us": the contact form on the left, the head-office details on the right. */
export default function Write({
  form,
  details,
  contact,
  locale,
}: {
  form: ContactPageT["form"];
  details: ContactPageT["details"];
  contact: ContactInfo;
  locale: string;
}) {
  return (
    <section id={FORM_ID} aria-labelledby="contact-form-title" className="scroll-mt-16 bg-slate-50">
      <div className="mx-auto max-w-[1440px] px-4 py-16 lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:items-start lg:gap-12 lg:px-6 lg:py-20 xl:gap-16">
        <div>
          <p className="flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#005e95]">
            <span className="h-[3px] w-8 rounded-full bg-[#00a0e3]" aria-hidden />
            {form.kicker}
          </p>
          <h2
            id="contact-form-title"
            className="mt-4 text-[30px] font-bold leading-[1.1] text-slate-900 sm:text-[40px]"
          >
            {form.title}
          </h2>
          <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-slate-700">{form.subtitle}</p>

          <div className="mt-8 rounded-lg border border-slate-200 bg-white p-5 sm:p-8">
            <ContactForm t={form} locale={locale} fallbackEmail={contact.email} />
          </div>
        </div>

        <div className="mt-10 lg:sticky lg:top-24 lg:mt-0">
          <Details data={details} contact={contact} locale={locale} />
        </div>
      </div>
    </section>
  );
}
