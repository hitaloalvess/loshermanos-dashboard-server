import { SaleProduct } from '@prisma/client';

interface ISaleProductsRepository {
    create(id_sale: string, id_product: string): Promise<SaleProduct>;
}

export { ISaleProductsRepository };
