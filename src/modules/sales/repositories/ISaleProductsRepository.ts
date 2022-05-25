import { SaleProduct } from '@prisma/client';

interface ISaleProductsRepository {
    create(id_sale: string, id_product: string): Promise<SaleProduct>;
    deleteAllProductsSale(id_sale: string): Promise<void>;
}

export { ISaleProductsRepository };
