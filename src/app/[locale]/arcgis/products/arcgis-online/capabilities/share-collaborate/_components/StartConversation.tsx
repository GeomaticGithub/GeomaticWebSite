import Image from "next/image";
import Link from "next/link";
import type { ShareCollabMsgs } from "../constants";

export default function StartConversation({
  block,
}: {
  block: ShareCollabMsgs["startConversation"];
}) {
  const [img1] = block.stackedImages;
  return (
    <section className="bg-white">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
        {/* image (left) - takes full half of viewport */}
        <div className="flex items-center justify-center px-6 py-14">
          {img1 && (
            <Image
              src={img1}
              alt=""
              width={800}
              height={600}
              className="w-full h-auto"
            />
          )}
        </div>

        {/* text (right) - takes other half of viewport */}
        <div className="bg-transparent p-8 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            {block.title}
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {block.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
          <Link
            href={block.ctaHref}
            className="mt-5 inline-block text-blue-600 underline"
          >
            {block.ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
