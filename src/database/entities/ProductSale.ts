import { Product, Sale } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

class ProductSale {
    id_sale?: string;
    sale?: Sale;
    id_product?: string;
    product?: Product;
    amount!: number;
}

export { ProductSale };
