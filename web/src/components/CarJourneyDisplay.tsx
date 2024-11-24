import { FaCarSide } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

export function CarJourneyDisplay() {
  return (
    <div className="flex w-full items-center justify-center gap-5">
      <FaCarSide className="h-5 w-5 text-slate-500" />
      <div className="h-2 w-2 rounded-full border border-slate-400" />
      <div className="h-2 w-2 rounded-full border border-slate-400" />
      <div className="h-2 w-2 rounded-full border border-slate-400" />
      <div className="h-2 w-2 rounded-full border border-slate-400" />
      <div className="h-2 w-2 rounded-full border border-slate-400" />
      <IoLocationOutline className="h-5 w-5 text-slate-500" />
    </div>
  );
}
