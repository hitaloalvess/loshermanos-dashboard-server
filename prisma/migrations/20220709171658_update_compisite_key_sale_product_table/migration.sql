/*
  Warnings:

  - You are about to alter the column `product_value` on the `sale_products` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(6,2)`.

*/
-- AlterTable
ALTER TABLE "sale_products" ALTER COLUMN "amount" SET DEFAULT 0,
ALTER COLUMN "product_value" SET DATA TYPE DECIMAL(6,2);
