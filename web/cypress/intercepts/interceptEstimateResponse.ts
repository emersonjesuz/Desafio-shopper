export function interceptEstimateResponse() {
  return {
    origin: {
      latitude: -23.55052,
      longitude: -46.633308,
    },
    destination: {
      latitude: -22.909938,
      longitude: -47.062633,
    },
    distance: 0,
    duration: "",
    options: [
      {
        id: 1,
        description: "Carro igual nota de 3, todo falsificado!",
        name: "Dick vigarista",
        vehicle: "Uno sem escada",
        review: {
          rating: 3,
          comment: "Bom!",
        },
        value: 100,
      },
      {
        id: 2,
        description:
          "Ótimo em ultrapassagem, drift porem sempre da pau no carnaval!",
        name: "Neymar Jr",
        vehicle: "Ferrari",
        review: {
          rating: 5,
          comment: "Excelente!",
        },
        value: 100000,
      },
    ],
    routeResponse: {},
  };
}
