import { Decimal } from '@prisma/client/runtime';

import { Product } from './Product';
import { Sale } from './Sale';

class ProductSale {
    id_sale?: string;
    sale?: Sale;
    id_product?: string;
    product?: Product;
    amount!: number;
    product_value!: Decimal;
}

export { ProductSale };
