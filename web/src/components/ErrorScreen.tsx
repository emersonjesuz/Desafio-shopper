"use client";
import { useErrorStore } from "@/stores/useErrorStore";
import { BiSolidMessageError } from "react-icons/bi";

export function ErrorScreen() {
  const { error, setError } = useErrorStore((state) => state);
  return (
    <div className="fixed left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/25">
      <div className="h-[400px] w-[300px] rounded-2xl bg-white p-5 lg:w-[400px]">
        <section className="flex h-full w-full flex-col justify-between">
          <BiSolidMessageError className="h-20 w-20 self-center fill-orange-700" />
          <p className="text-center text-zinc-600">{error.message}</p>
          <button
            onClick={() => setError({ message: "", show: false })}
            className="h-10 w-full rounded-lg bg-zinc-900 text-white"
          >
            Confirmar
          </button>
        </section>
      </div>
    </div>
  );
}
