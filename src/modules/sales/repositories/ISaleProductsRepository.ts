import { ProductSale } from '../../../database/entities';
import { ICreateSaleProductDTO } from '../dtos/ICreateSaleProductDTO';

interface IProductsSaleRepository {
    create({
        id_sale,
        id_product,
        amount,
        product_value,
    }: ICreateSaleProductDTO): Promise<ProductSale>;
    deleteAllProductsSale(id_sale: string): Promise<void>;
    findAll(id_sale: string): Promise<ProductSale[]>;
}

export { IProductsSaleRepository };
