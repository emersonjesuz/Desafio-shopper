"use client";
import { formatterPrice } from "@/helpers/formatterPrice";
import { ridesSaveApi } from "@/services/rides.Api";
import { useErrorStore } from "@/stores/useErrorStore";
import { useEstimateStore } from "@/stores/useEstimateStore";
import { useRidesStore } from "@/stores/useRidesStore";
import { useRouterStore } from "@/stores/useRouterStore";
import axios from "axios";
import { BiCommentDetail } from "react-icons/bi";
import { FaCarAlt } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";

interface Driver {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: Review;
  value: number;
}

interface Review {
  rating: number;
  comment: string;
}

interface Props {
  driver: Driver;
}

export function DriverCard({ driver }: Props) {
  const { estimate } = useEstimateStore((state) => state);
  const { rideData } = useRidesStore((state) => state);
  const { setError } = useErrorStore((state) => state);
  const { setRouter } = useRouterStore((state) => state);

  async function saveRides() {
    try {
      const data = {
        ...rideData,
        driver: {
          id: driver.id,
          name: driver.name,
        },
        distance: estimate.distance,
        duration: estimate.duration,
        value: driver.value,
      };
      await ridesSaveApi(data);
      setRouter("rides");
    } catch (error) {
      let message =
        "Estamos passando por problemas técnicos, por favor tente mas tarde!";
      if (axios.isAxiosError(error)) {
        message =
          error.response?.data.error_description ??
          error.response?.data.error_description;
      }
      setError({ message, show: true });
    }
  }

  return (
    <article className="bg-zinc-10 flex h-[100px] items-center justify-center gap-1 border-b border-gray-200 bg-zinc-100 px-2 py-2 shadow-sm shadow-black/10 lg:w-[500px] lg:justify-around">
      <div className="flex flex-col">
        <div className="flex items-center gap-3">
          <h1 className="font-bold capitalize">{driver.name}</h1>

          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <IoStarSharp className="h-4 w-4 fill-yellow-400" />
              <span className="text-[12px] text-zinc-600">
                {driver.review.rating}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <BiCommentDetail className="h-4 w-4 fill-zinc-600" />
              <span className="text-[10px] text-zinc-600">
                {driver.review.comment}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <FaCarAlt />
          <p className="text-[10px] font-semibold">{driver.vehicle}</p>
        </div>
        <p className="text-[10px] lg:max-w-[300px]">{driver.description}</p>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-semibold text-zinc-700">
          {formatterPrice(driver.value)}
        </p>
        <button
          type="button"
          onClick={() => saveRides()}
          className="h-10 rounded-lg bg-zinc-900 px-3 text-[12px] text-white lg:w-[100px] lg:hover:bg-zinc-700"
        >
          Escolher
        </button>
      </div>
    </article>
  );
}
