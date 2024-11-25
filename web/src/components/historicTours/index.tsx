import { HeaderHistoricTours } from "./HeaderHistoricTours";
import { RidesCard } from "./RidesCard";

export function HistoricToursScreen() {
  return (
    <div className="flex min-h-[80vh] w-full max-w-[1100px] flex-col space-y-3 px-2 lg:py-10">
      <HeaderHistoricTours />
      <section className="flex w-full max-w-[1100px] flex-col gap-1 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between lg:gap-5">
        {[1, 2, 3, 4, 5, 6, 6, 1, 1, 1, 1, 1, 1, 1].map((item) => (
          <RidesCard />
        ))}
      </section>
    </div>
  );
}
