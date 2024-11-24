"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import carImage from "@/assets/car.png";
import { IoLocationOutline } from "react-icons/io5";
import { FaCarSide } from "react-icons/fa";
import { CarJourneyDisplay } from "@/components/CarJourneyDisplay";

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

export default function Home() {
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form data:", values);
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-b from-[#e4e4e7] to-zinc-400">
      <div className="flex h-[95%] w-11/12 items-center justify-center rounded-2xl bg-neutral-50 shadow-xl shadow-black/20">
        <div className="flex w-full flex-col items-center justify-center">
          <Image
            className="lg-h-auto h-[100px] w-1/2 object-cover lg:max-w-[400px]"
            src={carImage}
            alt="logo - image de um carro"
            width={500}
            height={500}
          />
          <h1 className="text-center text-xl font-bold text-zinc-600">
            Instruções para sua viagem
          </h1>

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
        </div>
      </div>
    </div>
  );
}
