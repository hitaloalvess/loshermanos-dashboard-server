import { IFunFindAllParams } from '../../../@types';
import { Product } from '../../../database/entities';
import { ICreateProductDTO } from '../dtos/ICreateProductDTO';
import { IUpdateProductDTO } from '../dtos/IUpdateProductDTO';

interface IProductsRepository {
    create(data: ICreateProductDTO): Promise<Product>;
    update(data: IUpdateProductDTO): Promise<Product>;
    deleteById(id_product: string): Promise<Product>;
    findByDescription(
        description: string,
        id_account: string,
    ): Promise<Product | null>;
    findById(id: string): Promise<Product | undefined | null>;
    findAll({ id_account, limit, page }: IFunFindAllParams): Promise<Product[]>;
}

export { IProductsRepository };
