export interface Driver {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: Review;
  tax: number;
  minimumKilometers: number;
}

interface Review {
  rating: number;
  comment: string;
}

export const drivers = (): Driver[] => {
  const comments = [
    "Não gostei!",
    "Podia ser melhor!",
    "Gostei!",
    "Muito bom!",
    "Excelente!",
  ];

  const vehicles = [
    "Toyota Etios",
    "Volkswagen Gol",
    "Chevrolet Onix",
    "Hyundai HB20",
    "Ford Ka",
  ];

  const names = ["Dom Pedro", "João", "Maria", "Jorge", "Teresa"];
  const lastName = ["Silva", "Santos", "Pereira", "Ferreira", "Costa"];

  const driver: Driver[] = [];

  for (let index = 0; index <= 20; index++) {
    const minimumKilometers = Math.round(Math.random() * 50) + 1;
    const tax = 2.5 * Math.pow(2, Math.floor(minimumKilometers / 5));
    const rating = Math.round(Math.random() * 4) + 1;
    driver.push({
      id: index + 1,
      name: ` ${names[Math.round(Math.random() * 4)]} ${
        lastName[Math.round(Math.random() * 4)]
      }`,
      description:
        "Ruin de curva, pode demorar um pouco para chegar ao destino",
      vehicle: vehicles[Math.round(Math.random() * 4)],
      review: {
        rating,
        comment: comments[rating - 1],
      },
      minimumKilometers,
      tax,
    });
  }
  return driver;
};
