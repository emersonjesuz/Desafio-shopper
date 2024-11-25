import { FaCarSide } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { RiPinDistanceLine } from "react-icons/ri";

export function RidesCard() {
  return (
    <article className="bg-zinc-10 flex h-[200px] flex-col justify-between gap-1 border-b border-gray-300 bg-zinc-200 px-2 py-2 shadow-sm shadow-black/10 lg:w-[500px] lg:justify-around">
      <div className="flex flex-col rounded-md bg-zinc-100 px-2 py-1">
        <div className="flex items-center gap-3">
          <h1 className="font-bold capitalize">paulo souza</h1>
          <p className="text-[13px] text-zinc-600">
            {new Date().toISOString()}
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-end gap-2">
        <p className="w-full text-sm text-zinc-600">
          Saiu da{" "}
          <span className="font-semibold text-zinc-800">
            {" "}
            Rua alto novo, centro, Macururé - Bahia{" "}
          </span>
        </p>
        <p className="w-full text-sm text-zinc-600">
          Chegou em{" "}
          <span className="font-semibold text-zinc-800">
            {" "}
            Av. Pedro segundo, 1222, centro, Macururé - Bahia{" "}
          </span>
        </p>
      </div>

      <div className="flex h-10 items-end justify-between">
        <div className="flex items-center gap-1">
          <FaCarSide />
          <p className="text-zinc-600">5 Km </p>
        </div>
        <div className="flex items-center gap-1">
          <IoIosTime />
          <p className="text-zinc-600">10 Horas</p>
        </div>
        <div className="flex items-center justify-center rounded-md bg-zinc-100 px-3 py-1">
          <p className="font-semibold text-zinc-600">R$ 1,0000</p>
        </div>
      </div>
    </article>
  );
}
