"use client";
import { CarJourneyDisplay } from "@/components/CarJourneyDisplay";
import { estimateApi } from "@/services/estimateApi";
import { useErrorStore } from "@/stores/useErrorStore";
import { useEstimateStore } from "@/stores/useEstimateStore";
import { useRidesStore } from "@/stores/useRidesStore";
import { useRouterStore } from "@/stores/useRouterStore";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  destination: z.string().min(1, {
    message: "Por favor, informe um destino válido para sua viagem.",
  }),
  origin: z.string().min(1, {
    message: "Por favor, informe um ponto de partida para sua viagem.",
  }),
  customer_id: z
    .string()
    .min(1, { message: "Por favor, informe um ID de cliente." }),
});

export function EstimateForm() {
  const { setRouter } = useRouterStore((state) => state);
  const { setEstimate } = useEstimateStore((state) => state);
  const { setError } = useErrorStore((state) => state);
  const { setRideData } = useRidesStore((state) => state);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      origin: "",
      customer_id: "",
    },
  });

  async function onSubmit({
    customer_id,
    destination,
    origin,
  }: z.infer<typeof formSchema>) {
    try {
      const { data } = await estimateApi(customer_id, origin, destination);
      setEstimate(data);
      setRideData({ customer_id, origin, destination });
      setRouter("drivers");
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
    <form
      className="w-full space-y-4 p-5 lg:max-w-[600px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex w-full flex-col items-center justify-center">
        <input
          className="w-full rounded-lg border-2 border-gray-300 p-2 text-stone-600"
          id="customer_id"
          placeholder="Insira seu ID#"
          {...register("customer_id")}
        />

        {errors.customer_id && (
          <p className="w-full pl-2 text-sm text-red-400">
            {errors.customer_id.message}
          </p>
        )}
      </div>
      <div className="flex w-full flex-col items-center justify-center">
        <input
          className="w-full rounded-lg border-2 border-gray-300 p-2 text-stone-600"
          id="origin"
          placeholder="Escolha seu ponto de partida"
          {...register("origin")}
        />
        {errors.origin && (
          <p className="w-full pl-2 text-sm text-red-400">
            {errors.origin.message}
          </p>
        )}
      </div>
      <CarJourneyDisplay />
      <div className="flex w-full flex-col items-center justify-center">
        <input
          className="w-full rounded-lg border-2 border-gray-300 p-2 text-stone-600"
          id="origin"
          placeholder="Informe o destino"
          {...register("destination")}
        />
        {errors.destination && (
          <p className="w-full pl-2 text-sm text-red-400">
            {errors.destination.message}
          </p>
        )}
      </div>
      <button className="w-full rounded-lg bg-zinc-700 p-2 text-white lg:mt-10 lg:hover:bg-zinc-600">
        Confirmar
      </button>
    </form>
  );
}
