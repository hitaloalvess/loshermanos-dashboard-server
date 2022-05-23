import { Product } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { IProductsRepository } from '../../repositories/IProductsRepository';

@injectable()
class ListAllProductsUseCase {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,

        @inject('AccountsRepository')
        private accountsRepository: IAccountsRepository,
    ) {}
    async execute(id_account: string): Promise<Product[]> {
        const accountExists = await this.accountsRepository.findById(
            id_account,
        );

        if (!accountExists) {
            throw new AppError('Account does not exists');
        }

        const products = await this.productsRepository.findAll(id_account);

        return products;
    }
}

export { ListAllProductsUseCase };
