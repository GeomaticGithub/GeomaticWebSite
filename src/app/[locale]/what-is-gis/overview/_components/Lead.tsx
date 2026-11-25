export default function Lead({ text }: { text: string }) {
  return (
    <section className="bg-[#412BB1] text-white">
      <div className="flex flex-col gap-2 mx-auto max-w-[1440px] px-6 py-36">
        <p className="max-w-2xl leading-relaxed">{text}</p>
      </div>
    </section>
  );
}
