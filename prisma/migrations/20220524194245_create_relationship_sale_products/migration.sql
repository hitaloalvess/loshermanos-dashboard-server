-- CreateTable
CREATE TABLE "sale_products" (
    "id" TEXT NOT NULL,
    "id_sale" TEXT NOT NULL,
    "id_product" TEXT NOT NULL,

    CONSTRAINT "sale_products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sale_products" ADD CONSTRAINT "sale_products_id_product_fkey" FOREIGN KEY ("id_product") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_products" ADD CONSTRAINT "sale_products_id_sale_fkey" FOREIGN KEY ("id_sale") REFERENCES "sales"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
