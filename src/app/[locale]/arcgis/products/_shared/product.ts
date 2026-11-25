// Content of a product or capability page in the common shape (src/messages/<lang>/product-pages/<slug>.json):
// a banner, then a list of blocks shown in order. Server only: pictures that are not in /public are left out.
import fs from "node:fs";
import path from "node:path";

/** Name of a label in product-ui.json ("kickers"): the small heading above a block. */
export type KickerKey = string;

export type Item = {
  title: string;
  /** small line above the title (a category, for example) */
  label?: string;
  text?: string;
  paragraphs?: string[];
  bullets?: string[];
  /** names shown as small tags under the text (the apps a step relies on, for example) */
  tags?: string[];
  icon?: string;
  image?: string;
  href?: string;
  linkLabel?: string;
};

export type Block =
  | { type: "lead"; text: string }
  | { type: "tabs"; kicker: KickerKey; title: string; text?: string; items: (Item & { heading?: string; thumb?: string })[] }
  | { type: "rows"; kicker?: KickerKey; title?: string; text?: string; items: Item[] }
  | { type: "cards"; kicker?: KickerKey; title?: string; text?: string; image?: string; items: Item[] }
  | { type: "steps"; kicker: KickerKey; title?: string; image?: string; steps: { title: string; desc: string }[] }
  | { type: "stories"; kicker: KickerKey; title: string; text?: string; items: { label: string; title?: string; desc?: string; image?: string; actionText?: string; actionUrl?: string }[] }
  | { type: "quote"; quote: string; author: string; role?: string; avatar?: string }
  | { type: "band"; kicker?: KickerKey; title: string; text?: string; paragraphs?: string[]; bullets?: string[]; image?: string; href?: string; linkLabel?: string; dark?: boolean }
  | { type: "embed"; kicker: KickerKey; title: string; text?: string; url: string; href?: string; linkLabel?: string }
  | { type: "tiles"; kicker: KickerKey; title: string; text?: string; items: Item[] };

export type ProductContent = {
  hero: { kicker: KickerKey; icon?: string; title: string; subtitle?: string; text?: string; bgImage?: string; image?: string };
  blocks: Block[];
};

const exists = (p?: string) => Boolean(p && p.startsWith("/") && fs.existsSync(path.join(process.cwd(), "public", decodeURIComponent(p))));
const pic = (p?: string) => (exists(p) ? p : undefined);
/** Pictures that exist; a line drawing (.svg) given as the picture of a card is shown small, as its icon. */
const item = <T extends Item>(it: T): T => {
  const image = pic(it.image);
  const drawing = image?.endsWith(".svg") && !it.icon;
  return { ...it, icon: drawing ? image : pic(it.icon), image: drawing ? undefined : image };
};

export async function loadProduct(slug: string, lang: "fr" | "en"): Promise<ProductContent> {
  const raw = (await import(`@/messages/${lang}/product-pages/${slug}.json`)).default as unknown as ProductContent;
  const blocks = raw.blocks.map((b): Block => {
    switch (b.type) {
      case "tabs":
        return { ...b, items: b.items.map((it) => ({ ...item(it), thumb: pic(it.thumb) })) };
      case "rows":
      case "tiles":
        return { ...b, items: b.items.map(item) };
      case "cards":
        return { ...b, image: pic(b.image), items: b.items.map(item) };
      case "steps":
        return { ...b, image: pic(b.image) };
      case "stories":
        return { ...b, items: b.items.map((s) => ({ ...s, image: pic(s.image) })) };
      case "quote":
        return { ...b, avatar: pic(b.avatar) };
      case "band":
        return { ...b, image: pic(b.image) };
      default:
        return b;
    }
  });
  return {
    hero: { ...raw.hero, icon: pic(raw.hero.icon), bgImage: pic(raw.hero.bgImage), image: pic(raw.hero.image) },
    blocks,
  };
}
