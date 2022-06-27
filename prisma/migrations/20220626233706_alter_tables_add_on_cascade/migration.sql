-- DropForeignKey
ALTER TABLE "customers" DROP CONSTRAINT "customers_id_account_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_id_account_fkey";

-- DropForeignKey
ALTER TABLE "roles" DROP CONSTRAINT "roles_id_account_fkey";

-- DropForeignKey
ALTER TABLE "sale_products" DROP CONSTRAINT "sale_products_id_product_fkey";

-- DropForeignKey
ALTER TABLE "sale_products" DROP CONSTRAINT "sale_products_id_sale_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_id_account_fkey";

-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_id_customer_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_id_account_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_id_role_fkey";

-- DropForeignKey
ALTER TABLE "users_token" DROP CONSTRAINT "users_token_id_user_fkey";

-- AlterTable
ALTER TABLE "sale_products" ALTER COLUMN "amount" SET DEFAULT 0;

-- AddForeignKey
ALTER TABLE "roles" ADD CONSTRAINT "roles_id_account_fkey" FOREIGN KEY ("id_account") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_id_account_fkey" FOREIGN KEY ("id_account") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_token" ADD CONSTRAINT "users_token_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_id_account_fkey" FOREIGN KEY ("id_account") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_id_account_fkey" FOREIGN KEY ("id_account") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_id_account_fkey" FOREIGN KEY ("id_account") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_id_customer_fkey" FOREIGN KEY ("id_customer") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_products" ADD CONSTRAINT "sale_products_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_products" ADD CONSTRAINT "sale_products_id_sale_fkey" FOREIGN KEY ("id_sale") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE;
