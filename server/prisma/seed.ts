import { Drivers, PrismaClient, Reviews } from "@prisma/client";
import { drivers } from "../src/database/inMemory/driver.database";
const prisma = new PrismaClient();
async function main() {
  const countDriversDb = await prisma.drivers.count();
  if (countDriversDb) {
    return;
  }

  let listDrivers: Drivers[] = [];
  let listReviews: Reviews[] = [];

  drivers().forEach((driver) => {
    listDrivers.push({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      minimumKilometers: driver.minimumKilometers,
      tax: driver.tax,
    });
    listReviews.push({
      id: driver.id,
      rating: driver.review.rating,
      comment: driver.review.comment,
      driver_id: driver.id,
    });
  });

  await prisma.drivers.createMany({
    data: [...listDrivers],
  });
  await prisma.reviews.createMany({
    data: [...listReviews],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
