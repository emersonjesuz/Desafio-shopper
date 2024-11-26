import { formatterDateBR } from "@/helpers/formatterDateBR";
import { formatterDistance } from "@/helpers/formatterDistance";
import { formatterPrice } from "@/helpers/formatterPrice";
import { Ride } from "@/stores/useRidesStore";
import { FaCarSide } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";

interface Props {
  ride: Ride;
}
export function RidesCard({ ride }: Props) {
  return (
    <article className="bg-zinc-10 sha flex h-[200px] flex-col justify-between gap-1 rounded-lg border-b border-gray-300 bg-[#f1f1f1] px-2 py-2 shadow-sm shadow-black/60 lg:w-[500px] lg:justify-around lg:px-5">
      <div className="flex flex-col border-b border-b-zinc-700 px-2 py-1">
        <div className="flex items-center justify-between gap-3">
          <h1 className="font-bold capitalize">{ride.driver.name}</h1>
          <p className="text-[13px] text-zinc-600">
            {formatterDateBR(ride.date)}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-end gap-2">
        <p className="w-full text-sm text-zinc-600">
          Saiu da{" "}
          <span className="font-semibold text-zinc-800">{ride.origin}</span>
        </p>
        <p className="w-full text-sm text-zinc-600">
          Chegou em{" "}
          <span className="font-semibold text-zinc-800">
            {" "}
            {ride.destination}
          </span>
        </p>
      </div>

      <div className="flex h-10 items-end justify-between">
        <div className="flex items-center gap-1">
          <FaCarSide />
          <p className="text-zinc-600">{formatterDistance(ride.distance)}</p>
        </div>
        <div className="flex items-center gap-1">
          <IoIosTime />
          <p className="text-zinc-600">{ride.duration}</p>
        </div>
        <div className="flex items-center justify-center rounded-md bg-zinc-800 px-3 py-1">
          <p className="font-semibold text-zinc-100">
            {formatterPrice(ride.value)}
          </p>
        </div>
      </div>
    </article>
  );
}
