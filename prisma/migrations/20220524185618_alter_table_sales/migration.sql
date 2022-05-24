/*
  Warnings:

  - Added the required column `total` to the `sales` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sales" ADD COLUMN     "total" MONEY NOT NULL,
ADD COLUMN     "value_pay" MONEY NOT NULL DEFAULT 0;
