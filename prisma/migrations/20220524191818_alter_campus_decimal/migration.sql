/*
  Warnings:

  - You are about to alter the column `price` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(6,2)`.
  - You are about to alter the column `descount` on the `sales` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(6,2)`.
  - You are about to alter the column `total` on the `sales` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(6,2)`.
  - You are about to alter the column `value_pay` on the `sales` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(6,2)`.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "price" SET DATA TYPE DECIMAL(6,2);

-- AlterTable
ALTER TABLE "sales" ALTER COLUMN "descount" SET DATA TYPE DECIMAL(6,2),
ALTER COLUMN "total" SET DATA TYPE DECIMAL(6,2),
ALTER COLUMN "value_pay" SET DATA TYPE DECIMAL(6,2);
