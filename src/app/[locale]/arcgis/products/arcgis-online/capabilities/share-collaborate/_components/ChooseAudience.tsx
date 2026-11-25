import Image from "next/image";
import type { ShareCollabMsgs } from "../constants";

export default function ChooseAudience({
  block,
}: {
  block: ShareCollabMsgs["chooseAudience"];
}) {
  const [img1] = block.collageImages;
  return (
    <section>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
        {/* text (left) - takes half of viewport */}
        <div className="p-8 flex flex-col justify-center items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              {block.title}
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              {block.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* image (right) - takes other half of viewport */}
        <div className="flex items-center justify-center px-6 py-14">
          {img1 && (
            <Image
              src={img1}
              alt=""
              width={800}
              height={600}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          )}
        </div>
      </div>
    </section>
  );
}
