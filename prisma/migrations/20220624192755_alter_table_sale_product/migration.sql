/*
  Warnings:

  - The primary key for the `sale_products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `sale_products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sale_products" DROP CONSTRAINT "sale_products_pkey",
DROP COLUMN "id",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0,
ADD CONSTRAINT "sale_products_pkey" PRIMARY KEY ("id_sale", "id_product");
