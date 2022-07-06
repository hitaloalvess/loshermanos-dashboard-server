-- AlterTable
ALTER TABLE "sale_products" ALTER COLUMN "amount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false;
