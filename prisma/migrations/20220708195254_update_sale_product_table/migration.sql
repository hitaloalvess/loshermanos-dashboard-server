/*
  Warnings:

  - Added the required column `product_value` to the `sale_products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sale_products" ADD COLUMN     "product_value" DECIMAL(65,30) NOT NULL,
ALTER COLUMN "amount" SET DEFAULT 0;
