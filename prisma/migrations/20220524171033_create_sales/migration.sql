-- CreateEnum
CREATE TYPE "Sale_type" AS ENUM ('PENDING', 'PAID_OUT');

-- CreateTable
CREATE TABLE "sales" (
    "id" TEXT NOT NULL,
    "descount" MONEY NOT NULL,
    "sale_type" "Sale_type" NOT NULL DEFAULT E'PENDING',
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_account" TEXT NOT NULL,
    "id_customer" TEXT NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_id_account_fkey" FOREIGN KEY ("id_account") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_id_customer_fkey" FOREIGN KEY ("id_customer") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
