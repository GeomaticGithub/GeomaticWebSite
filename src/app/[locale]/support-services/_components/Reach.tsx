import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { RiArrowRightLine } from "react-icons/ri";

/** Classes of the link that wraps a <Reach /> row, inside a bordered list. */
export const reachRow =
  "group flex items-center gap-4 px-5 py-5 transition-colors hover:bg-[#0079c1]/[0.05] sm:px-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0079c1]";

/** One way to reach a team: icon, label and the value (address, number or action). */
export function Reach({ icon: Icon, label, value }: { icon: IconType; label: string; value: ReactNode }) {
  return (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#0079c1]/10 text-[#005e95]">
        <Icon className="h-5 w-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-slate-600">{label}</span>
        <span className="mt-0.5 block break-words text-[17px] font-semibold text-slate-900 group-hover:text-[#005e95]">{value}</span>
      </span>
      <RiArrowRightLine className="h-5 w-5 shrink-0 text-[#0079c1] transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden />
    </>
  );
}
