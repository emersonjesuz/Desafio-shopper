import carImage from "@/assets/car.png";
import Image from "next/image";
import { EstimateForm } from "./EstimateForm";

export default function EstimateScreen() {
  return (
    <div className="flex w-[500px] flex-col items-center justify-center py-10 lg:min-h-[70vh]">
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
      <EstimateForm />
    </div>
  );
}
