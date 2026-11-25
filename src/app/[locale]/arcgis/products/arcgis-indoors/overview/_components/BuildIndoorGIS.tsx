import Image from "next/image";
import type { IndoorsMessages } from "../constants";

export default function BuildIndoorGIS({
  data,
}: {
  data: IndoorsMessages["build"];
}) {
  return (
    <section className="bg-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col gap-2 justify-center px-8 lg:px-16 w-5/6 mx-auto">
          <h3 className="text-xl lg:text-3xl xl:text-4xl font-semibold text-gray-900">
            {data.heading}
          </h3>
          <p className="text-gray-700 leading-relaxed">
            {data.desc}
          </p>
          <ul className="list-inside">
            {data.items.map((item, index) => (
              <li key={index} className="list-disc ml-5 text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative h-[300px] lg:h-[500px] w-full">
          <Image src={data.image} alt="" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}
