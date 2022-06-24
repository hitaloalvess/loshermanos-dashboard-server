import { ProductSale } from '../../../database/entities/ProductSale';
import { ICreateSaleProductDTO } from '../dtos/ICreateSaleProductDTO';

interface ISaleProductsRepository {
    create({
        id_sale,
        id_product,
        amount,
    }: ICreateSaleProductDTO): Promise<ProductSale>;
    deleteAllProductsSale(id_sale: string): Promise<void>;
    findAll(id_sale: string): Promise<ProductSale[]>;
}

export { ISaleProductsRepository };
