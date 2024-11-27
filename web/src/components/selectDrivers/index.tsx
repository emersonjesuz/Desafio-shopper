"use client";
import { Suspense } from "react";
import { DriverCard } from "./DriverCard";
import { CarJourneyDisplay } from "../CarJourneyDisplay";
import { useEstimateStore } from "@/stores/useEstimateStore";
import dynamic from "next/dynamic";
import { LatLngTuple } from "leaflet";

export function SelectDriversScreen() {
  const { estimate } = useEstimateStore((state) => state);
  const MapContainerScreen = dynamic<{
    origin: LatLngTuple;
    destination: LatLngTuple;
    className?: string;
    style?: React.CSSProperties;
  }>(() => import("../MapContainerScreen"), { ssr: false });

  return (
    <main className="w-full">
      <Suspense
        fallback={
          <div className="flex h-[200px] w-full animate-pulse items-center justify-center rounded-t-2xl bg-zinc-400 lg:h-[400px]">
            <span className="text-2xl text-zinc-50">Carregando...</span>
          </div>
        }
      >
        <MapContainerScreen
          origin={[estimate.origin.latitude, estimate.origin.longitude]}
          destination={[
            estimate.destination.latitude,
            estimate.destination.longitude,
          ]}
          className="h-[200px] w-full rounded-t-2xl shadow-lg shadow-black/20 lg:h-[400px]"
          style={{ boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.3)" }}
        />
      </Suspense>
      <div className="lg:py10 flex w-full flex-col items-center gap-1 py-5 lg:justify-center lg:gap-10">
        <header className="mb-5 max-w-[400px]">
          <h1
            data-cy="select-drivers-title"
            className="text-center text-2xl font-bold text-zinc-600 lg:text-3xl"
          >
            Escolha quem vai guiar até seu destino!
          </h1>
          <CarJourneyDisplay />
        </header>
        <section className="flex w-full max-w-[1100px] flex-col items-center justify-center gap-1 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-5">
          {estimate.options.map((driver) => (
            <DriverCard key={driver.id} driver={driver} />
          ))}
        </section>
      </div>
    </main>
  );
}
