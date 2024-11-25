import { CarJourneyDisplay } from "../CarJourneyDisplay";

export function HeaderHistoricTours() {
  return (
    <header className="flex flex-col items-center space-y-2 lg:flex-row lg:justify-between">
      <div className="my-10 lg:space-y-1">
        <h1 className="text-center text-2xl font-bold text-zinc-600 lg:text-3xl">
          Histórico de viagens
        </h1>
        <CarJourneyDisplay />
      </div>
      <div className="flex w-full flex-col items-center space-y-3 lg:max-w-[500px] lg:flex-row lg:space-x-2 lg:space-y-0">
        <input
          className="h-10 w-full rounded-lg border-2 border-gray-300 p-2 text-stone-600"
          id="customer_id"
          placeholder="Insira seu ID#"
          type="text"
        />
        <select
          className="h-10 w-full rounded-lg border-2 border-gray-300 text-stone-600"
          name=""
          id=""
        >
          <option value="">Todos</option>
          {[1, 2, 3, 4, 5, 6, 6, 1, 1, 1, 1, 1, 1, 1].map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
        <button className="h-10 w-full rounded-lg bg-zinc-900 text-white">
          Buscar
        </button>
      </div>
    </header>
  );
}
