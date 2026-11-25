// The common layout of the product and capability pages: a banner, then the blocks of the content file in order.
// Content: src/messages/<lang>/product-pages/<slug>.json (shape in ./product.ts); small labels: product-ui.json.
import Image from "next/image";
import { RiCheckLine, RiDoubleQuotesL } from "react-icons/ri";
import ContactCta from "@/app/[locale]/_components/sections/ContactCta";
import { Kicker, LinkArrow, LinkTiles, ProductHero, SectionHead, SmartLink, Steps, StoryCards, container, focusRing } from "./blocks";
import { resolveLink } from "./links";
import { loadProduct, type Block, type Item } from "./product";
import Showcase from "./Showcase";

type Ui = { contact: string; anchor: string; learnMore: string; howTitle: string; tabsLabel: string; kickers: Record<string, string> };

const cardHover = `transition-[border-color,box-shadow] duration-200 hover:border-[#0079c1] hover:shadow-[0_8px_24px_-12px_rgba(0,94,149,0.35)] ${focusRing}`;
const ID = "contenu";

function Bullets({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((b) => (
        <li key={b} className="flex items-start gap-3 text-[16px] leading-snug text-slate-800">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#0079c1] text-white">
            <RiCheckLine className="h-3.5 w-3.5" aria-hidden />
          </span>
          {b}
        </li>
      ))}
    </ul>
  );
}

/** A link shown as text with its arrow; nothing when the address leads nowhere. */
function TextLink({ href, label, locale, className = "" }: { href?: string; label?: string; locale: string; className?: string }) {
  if (!label || !resolveLink(href, locale).href) return null;
  return (
    <SmartLink
      href={href}
      locale={locale}
      className={`group inline-flex items-center gap-2 text-[15px] font-semibold text-[#0079c1] underline-offset-4 hover:text-[#005e95] hover:underline ${focusRing} ${className}`}
    >
      {label}
      <LinkArrow href={href} locale={locale} />
    </SmartLink>
  );
}

/** A screenshot or illustration, shown whole in a soft frame. */
function Shot({ src, sizes, ratio = "aspect-[16/10]" }: { src: string; sizes: string; ratio?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg border border-slate-200 bg-slate-50 ${ratio}`}>
      <Image src={src} alt="" fill sizes={sizes} unoptimized={src.endsWith(".gif")} className="object-contain" />
    </div>
  );
}

function Card({ it, locale, learnMore }: { it: Item; locale: string; learnMore: string }) {
  const linked = Boolean(resolveLink(it.href, locale).href);
  const body = (
    <>
      {it.image && (
        <span className="relative block aspect-[16/9] border-b border-slate-200 bg-slate-50">
          <Image src={it.image} alt="" fill sizes="(min-width: 1024px) 460px, 100vw" className={it.image.endsWith(".svg") ? "object-contain p-8" : "object-cover"} />
        </span>
      )}
      <span className="flex flex-1 flex-col p-6">
        {it.icon && <Image src={it.icon} alt="" width={48} height={48} className="mb-4 h-12 w-12 object-contain" />}
        {it.label && <span className="mb-2 block text-[13px] font-semibold uppercase tracking-[0.08em] text-[#005e95]">{it.label}</span>}
        <span className={`block text-[19px] font-semibold leading-snug text-slate-900 ${linked ? "group-hover:text-[#005e95]" : ""}`}>{it.title}</span>
        {it.text && <span className="mt-2 block text-[15px] leading-relaxed text-slate-700">{it.text}</span>}
        {it.bullets && it.bullets.length > 0 && (
          <span className="mt-3 block space-y-1.5">
            {it.bullets.map((b) => (
              <span key={b} className="flex items-start gap-2.5 text-[15px] leading-snug text-slate-800">
                <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#0079c1]" aria-hidden />
                {b}
              </span>
            ))}
          </span>
        )}
        {linked && (
          <span className="mt-auto inline-flex items-center gap-2 pt-5 text-[15px] font-semibold text-[#0079c1] group-hover:text-[#005e95]">
            {it.linkLabel ?? learnMore}
            <LinkArrow href={it.href} locale={locale} />
          </span>
        )}
      </span>
    </>
  );
  const box = "group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white";
  return linked ? (
    <SmartLink href={it.href} locale={locale} className={`${box} ${cardHover}`}>
      {body}
    </SmartLink>
  ) : (
    <div className={box}>{body}</div>
  );
}

function Rows({ items, locale, learnMore }: { items: Item[]; locale: string; learnMore: string }) {
  return (
    <div className="space-y-12 lg:space-y-16">
      {items.map((it, i) => (
        <article key={`${i}-${it.title}`} className={`grid items-center gap-6 lg:gap-14 ${it.image ? "lg:grid-cols-2" : ""}`}>
          {it.image && (
            <div className={i % 2 ? "lg:order-last" : ""}>
              <Shot src={it.image} sizes="(min-width: 1024px) 700px, 100vw" />
            </div>
          )}
          <div className={it.image ? "" : "max-w-3xl"}>
            <h3 className="text-[24px] font-bold leading-tight text-slate-900 sm:text-[28px]">{it.title}</h3>
            {it.text && <p className="mt-3 text-[17px] leading-relaxed text-slate-700">{it.text}</p>}
            {it.paragraphs?.map((p) => (
              <p key={p} className="mt-3 text-[17px] leading-relaxed text-slate-700">
                {p}
              </p>
            ))}
            <Bullets items={it.bullets} />
            {it.tags && it.tags.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {it.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-slate-300 bg-slate-50 px-3 py-1 text-[14px] font-medium text-slate-800">
                    {tag}
                  </li>
                ))}
              </ul>
            )}
            <TextLink href={it.href} label={it.linkLabel ?? (it.href ? learnMore : undefined)} locale={locale} className="mt-5" />
          </div>
        </article>
      ))}
    </div>
  );
}

function Section({ block: b, first, locale, ui }: { block: Block; first: boolean; locale: string; ui: Ui }) {
  const id = first ? ID : undefined;
  const k = (key?: string) => (key ? ui.kickers[key] ?? key : "");
  const light = "scroll-mt-16 border-t border-slate-200";

  switch (b.type) {
    case "lead":
      return (
        <section id={id} className={`${light} bg-white`}>
          <div className={`${container} py-14 lg:py-20`}>
            <p className="max-w-4xl text-[19px] leading-relaxed text-slate-700 sm:text-[21px]">{b.text}</p>
          </div>
        </section>
      );

    case "tabs": {
      const withPicture = b.items.filter((it) => it.image);
      return (
        <section id={id} className={`${light} bg-white`}>
          <div className={`${container} py-16 lg:py-24`}>
            <SectionHead kicker={k(b.kicker)} title={b.title} text={b.text} />
            {withPicture.length >= 2 ? (
              <Showcase
                label={ui.tabsLabel}
                items={withPicture.map((it) => ({
                  title: it.title,
                  heading: it.heading,
                  description: it.text ?? "",
                  bullets: it.bullets,
                  mainImage: it.image as string,
                  avatarImage: it.thumb,
                  href: it.href,
                  linkText: it.linkLabel,
                }))}
              />
            ) : (
              <div className="mt-10">
                <Rows items={b.items.map((it) => ({ ...it, title: it.heading ?? it.title }))} locale={locale} learnMore={ui.learnMore} />
              </div>
            )}
          </div>
        </section>
      );
    }

    case "rows":
      return (
        <section id={id} className={`${light} bg-white`}>
          <div className={`${container} py-16 lg:py-24`}>
            {b.title && <SectionHead kicker={k(b.kicker)} title={b.title} text={b.text} />}
            <div className={b.title ? "mt-10" : ""}>
              <Rows items={b.items} locale={locale} learnMore={ui.learnMore} />
            </div>
          </div>
        </section>
      );

    case "cards": {
      const n = b.items.length;
      const cols = b.image ? "sm:grid-cols-2" : n >= 5 ? "sm:grid-cols-2 lg:grid-cols-3" : n === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : n === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
      const grid = (
        <ul className={`grid gap-5 ${cols}`}>
          {b.items.map((it, i) => (
            <li key={`${i}-${it.title}`}>
              <Card it={it} locale={locale} learnMore={ui.learnMore} />
            </li>
          ))}
        </ul>
      );
      return (
        <section id={id} className={`${light} bg-slate-50`}>
          <div className={`${container} py-16 lg:py-24`}>
            {b.title && <SectionHead kicker={k(b.kicker)} title={b.title} text={b.text} />}
            <div className={b.title ? "mt-10" : ""}>
              {b.image ? (
                <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
                  <Shot src={b.image} sizes="(min-width: 1024px) 560px, 100vw" ratio="aspect-[4/3]" />
                  {grid}
                </div>
              ) : (
                grid
              )}
            </div>
          </div>
        </section>
      );
    }

    case "steps":
      return (
        <div id={id} className="scroll-mt-16">
          <Steps kicker={k(b.kicker)} title={b.title ?? ui.howTitle} image={b.image} steps={b.steps} />
        </div>
      );

    case "stories":
      return (
        <div id={id} className={`${light}`}>
          <StoryCards kicker={k(b.kicker)} title={b.title} text={b.text} items={b.items} locale={locale} />
        </div>
      );

    case "quote":
      return (
        <section id={id} className="scroll-mt-16 bg-[#07131f] text-white">
          <figure className={`${container} py-16 lg:py-20`}>
            <RiDoubleQuotesL className="h-10 w-10 text-sky-300" aria-hidden />
            <blockquote className="mt-4 max-w-4xl text-[22px] font-medium leading-relaxed sm:text-[26px]">{b.quote}</blockquote>
            <figcaption className="mt-6 flex items-center gap-4">
              {b.avatar && <Image src={b.avatar} alt="" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />}
              <span>
                <span className="block text-[17px] font-semibold">{b.author}</span>
                {b.role && <span className="block text-[15px] text-slate-300">{b.role}</span>}
              </span>
            </figcaption>
          </figure>
        </section>
      );

    case "band": {
      const linked = Boolean(b.linkLabel && resolveLink(b.href, locale).href);
      return (
        <section id={id} className={`scroll-mt-16 ${b.dark ? "bg-[#07131f] text-white" : `border-t border-slate-200 bg-slate-50`}`}>
          <div className={`${container} grid items-center gap-8 py-16 lg:gap-16 lg:py-24 ${b.image ? "lg:grid-cols-2" : ""}`}>
            {b.image && <Shot src={b.image} sizes="(min-width: 1024px) 700px, 100vw" />}
            <div className={b.image ? "" : "max-w-4xl"}>
              {b.kicker && <Kicker dark={b.dark}>{k(b.kicker)}</Kicker>}
              <h2 className={`text-[28px] font-bold leading-[1.12] sm:text-[36px] ${b.kicker ? "mt-4" : ""} ${b.dark ? "" : "text-slate-900"}`}>{b.title}</h2>
              {[b.text, ...(b.paragraphs ?? [])].filter(Boolean).map((p) => (
                <p key={p} className={`mt-4 text-[17px] leading-relaxed ${b.dark ? "text-slate-300" : "text-slate-700"}`}>
                  {p}
                </p>
              ))}
              <Bullets items={b.bullets} />
              {linked && (
                <SmartLink
                  href={b.href}
                  locale={locale}
                  className={`group mt-7 inline-flex min-h-[48px] items-center gap-2 px-6 text-[15px] font-semibold transition-colors ${
                    b.dark
                      ? "bg-white text-[#005e95] hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07131f]"
                      : `bg-[#0079c1] text-white hover:bg-[#005e95] ${focusRing}`
                  }`}
                >
                  {b.linkLabel}
                  <LinkArrow href={b.href} locale={locale} />
                </SmartLink>
              )}
            </div>
          </div>
        </section>
      );
    }

    case "embed":
      return (
        <section id={id} className="scroll-mt-16 bg-[#07131f] text-white">
          <div className={`${container} grid items-center gap-8 py-16 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-14 lg:py-24`}>
            <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
              <iframe
                src={b.url}
                title={b.title}
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
            <div>
              <SectionHead dark kicker={k(b.kicker)} title={b.title} text={b.text} />
              {b.linkLabel && resolveLink(b.href, locale).href && (
                <SmartLink
                  href={b.href}
                  locale={locale}
                  className="group mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-sky-300 underline-offset-4 hover:text-sky-200 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07131f]"
                >
                  {b.linkLabel}
                  <LinkArrow href={b.href} locale={locale} />
                </SmartLink>
              )}
            </div>
          </div>
        </section>
      );

    case "tiles":
      return (
        <div id={id} className="scroll-mt-16">
          <LinkTiles
            kicker={k(b.kicker)}
            title={b.title}
            text={b.text}
            items={b.items.map((it) => ({ title: it.title, desc: it.text ?? "", linkText: it.linkLabel ?? ui.learnMore, href: it.href, icon: it.icon }))}
            locale={locale}
          />
        </div>
      );
  }
}

export default async function ProductPage({ slug, locale }: { slug: string; locale: string }) {
  const lang = locale?.toLowerCase().startsWith("fr") ? "fr" : "en";
  const ui = (await import(`@/messages/${lang}/product-pages/ui.json`)).default as unknown as Ui;
  const cta = (await import(`@/messages/${lang}/home.json`)).default.home.contactCta;
  const t = await loadProduct(slug, lang);

  return (
    <>
      <ProductHero
        dark
        kicker={ui.kickers[t.hero.kicker] ?? t.hero.kicker}
        icon={t.hero.icon}
        title={t.hero.title}
        subtitle={t.hero.subtitle}
        text={t.hero.text}
        bgImage={t.hero.bgImage}
        image={t.hero.image}
        contactLabel={ui.contact}
        anchorLabel={t.blocks.length ? ui.anchor : undefined}
        anchor={t.blocks.length ? ID : undefined}
        locale={locale}
      />
      {t.blocks.map((b, i) => (
        <Section key={i} block={b} first={i === 0} locale={locale} ui={ui} />
      ))}
      <ContactCta data={cta} locale={locale} />
    </>
  );
}
