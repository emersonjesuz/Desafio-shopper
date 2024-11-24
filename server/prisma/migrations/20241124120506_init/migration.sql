/*
  Warnings:

  - Changed the type of `distance` on the `Rides` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `value` on the `Rides` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Rides" DROP COLUMN "distance",
ADD COLUMN     "distance" INTEGER NOT NULL,
DROP COLUMN "value",
ADD COLUMN     "value" INTEGER NOT NULL;
