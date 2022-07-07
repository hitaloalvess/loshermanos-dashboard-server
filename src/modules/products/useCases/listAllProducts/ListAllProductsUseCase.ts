import { inject, injectable } from 'tsyringe';

import { EnvironmentType } from '../../../../@types';
import { AppError } from '../../../../shared/errors/AppError';
import { getUrlProduct } from '../../../../util/handleUrl';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { IProductResponseDTO } from '../../dtos/IProductResponseDTO';
import { IProductsRepository } from '../../repositories/IProductsRepository';

@injectable()
class ListAllProductsUseCase {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,

        @inject('AccountsRepository')
        private accountsRepository: IAccountsRepository,
    ) {}
    async execute(id_account: string): Promise<IProductResponseDTO[]> {
        const accountExists = await this.accountsRepository.findById(
            id_account,
        );

        if (!accountExists) {
            throw new AppError('Account does not exists');
        }

        const products = await this.productsRepository.findAll({ id_account });

        const newListProducts = products.map(product => {
            return {
                ...product,
                url: getUrlProduct(
                    process.env.DISK as EnvironmentType,
                    product.image_name,
                ),
            };
        });

        return newListProducts;
    }
}

export { ListAllProductsUseCase };
