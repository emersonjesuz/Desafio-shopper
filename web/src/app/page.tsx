"use client";
import { ErrorScreen } from "@/components/ErrorScreen";
import EstimateScreen from "@/components/estimate";
import { HistoricToursScreen } from "@/components/historicTours";
import { LayoutScreen } from "@/components/LayoutScreen";
import { SelectDriversScreen } from "@/components/selectDrivers/index";
import { useErrorStore } from "@/stores/useErrorStore";
import { useRouterStore } from "@/stores/useRouterStore";

export default function Home() {
  const { router } = useRouterStore((state) => state);
  const { error } = useErrorStore((state) => state);

  function RenderScreen() {
    switch (router) {
      case "estimate":
        return <EstimateScreen />;
      case "drivers":
        return <SelectDriversScreen />;
      case "rides":
        return <HistoricToursScreen />;
      default:
        return null;
    }
  }

  return (
    <LayoutScreen>
      <RenderScreen />
      {error.show && <ErrorScreen />}
    </LayoutScreen>
  );
}
