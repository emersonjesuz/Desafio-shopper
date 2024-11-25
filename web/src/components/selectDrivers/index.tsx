import { MapContainerScreen } from "@/components/MapContainerScreen";
import { Suspense } from "react";
import { DriverCard } from "./DriverCard";
import { CarJourneyDisplay } from "../CarJourneyDisplay";

export function SelectDriversScreen() {
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
          className="h-[200px] w-full rounded-t-2xl shadow-lg shadow-black/20 lg:h-[400px]"
          style={{ boxShadow: "0 -4px 6px -1px rgba(0, 0, 0, 0.3)" }}
        />
      </Suspense>
      <div className="lg:py10 flex w-full flex-col items-center gap-1 py-5 lg:justify-center lg:gap-10">
        <header className="mb-5 max-w-[400px]">
          <h1 className="text-center text-2xl font-bold text-zinc-600 lg:text-3xl">
            Escolha quem vai guiar até seu destino!
          </h1>
          <CarJourneyDisplay />
        </header>
        <section className="flex w-full max-w-[1100px] flex-col gap-1 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-5">
          {[1, 2, 3, 4, 5, 6, 6, 1, 1, 1, 1, 1, 1, 1].map((item) => (
            <DriverCard />
          ))}
        </section>
      </div>
    </main>
  );
}
