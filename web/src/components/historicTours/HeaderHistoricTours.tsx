"use client";
import { useEstimateStore } from "@/stores/useEstimateStore";
import { CarJourneyDisplay } from "../CarJourneyDisplay";
import { useRidesStore } from "@/stores/useRidesStore";
import { useState } from "react";
import { ridesListApi } from "@/services/rides.Api";
import axios from "axios";
import { useErrorStore } from "@/stores/useErrorStore";

export function HeaderHistoricTours() {
  const { estimate } = useEstimateStore((state) => state);
  const { setRidesList } = useRidesStore((state) => state);
  const { setError } = useErrorStore((state) => state);
  const [customerId, setCustomerId] = useState("");
  const [driverId, setDriverId] = useState("");

  async function handleSearch() {
    try {
      if (!customerId.trim()) {
        setError({
          message: "Por favor, informe um ID de cliente.",
          show: true,
        });
        return;
      }
      const { data } = await ridesListApi(customerId, driverId);

      setRidesList(data);
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
    <header className="flex flex-col items-center space-y-2 lg:flex-row lg:justify-between">
      <div className="my-10 lg:space-y-1">
        <h1
          data-cy="historic-title"
          className="text-center text-2xl font-bold text-zinc-600 lg:text-3xl"
        >
          Histórico de viagens
        </h1>
        <CarJourneyDisplay />
      </div>
      <div className="flex w-full max-w-[500px] flex-col items-center space-y-3 lg:flex-row lg:space-x-2 lg:space-y-0">
        <input
          className="h-8 w-full rounded-lg border-2 border-gray-300 p-2 text-stone-600"
          id="customer_id"
          data-cy="historic-input-customer-id"
          placeholder="Insira seu ID#"
          type="text"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <select
          className="h-8 w-full rounded-lg border-2 border-gray-300 text-stone-600"
          name="drivers"
          data-cy="historic-select-driver"
          id="drivers"
          onChange={(e) => setDriverId(e.target.value)}
          value={driverId}
        >
          <option value="">Todos os motoristas</option>
          {estimate.options.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
        <button
          type="button"
          data-cy="historic-search-button"
          onClick={() => handleSearch()}
          className="h-8 w-full rounded-lg bg-zinc-900 text-white lg:hover:bg-zinc-700"
        >
          Buscar
        </button>
      </div>
    </header>
  );
}
