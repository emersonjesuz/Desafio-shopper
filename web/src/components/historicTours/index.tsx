"use client";
import { useRidesStore } from "@/stores/useRidesStore";
import { HeaderHistoricTours } from "./HeaderHistoricTours";
import { RidesCard } from "./RidesCard";

export function HistoricToursScreen() {
  const { ridesList } = useRidesStore((state) => state);
  return (
    <div className="flex min-h-[80vh] w-full max-w-[1100px] flex-col space-y-5 px-2 py-10">
      <HeaderHistoricTours />
      <section className="flex w-full max-w-[1100px] flex-col gap-1 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-5">
        {ridesList.rides.map((ride) => (
          <RidesCard key={ride.id} ride={ride} />
        ))}
      </section>
    </div>
  );
}
