import Performance from "./Performance";
import type { AssetPageT } from "../constants";

export default function 
PerformanceList({
  data,
}: {
  data: AssetPageT["performanceList"];
}) {
  return (
    <div>
      {data.map((performanceItem, index) => (
        <div
          key={index}
          className={index > 0 ? "border-t border-gray-200" : ""}
        >
          <Performance
            data={performanceItem}
            imagePosition={index % 2 === 0 ? "left" : "right"}
          />
        </div>
      ))}
    </div>
  );
}
