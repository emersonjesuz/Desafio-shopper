export function interceptRidesResponse() {
  return {
    customer_id: "123",
    rides: [
      {
        id: 1,
        date: new Date(),
        destination: "Rua alto novo, centro, Macururé - Bahia",
        origin: "Rua Mock, centro, Paulo Afonso - Bahia",
        distance: 11000,
        driver: {
          id: 1,
          name: "Neymar Jr",
        },
        duration: "10 H",
        value: 1000,
      },
      {
        id: 2,
        date: new Date(),
        destination: "Rua alto novo, centro, Macururé - Bahia",
        origin: "Rua Mock, centro, Paulo Afonso - Bahia",
        distance: 122000,
        driver: {
          id: 2,
          name: "Cristiano Ronaldo",
        },
        duration: "30 H",
        value: 500,
      },
    ],
  };
}
