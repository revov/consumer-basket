-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('ITEM', 'KG', 'G', 'L', 'ML', 'PAIR');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "unit" "Unit" NOT NULL DEFAULT E'ITEM';
