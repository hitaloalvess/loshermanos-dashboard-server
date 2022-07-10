import { Decimal } from '@prisma/client/runtime';
import { inject, injectable } from 'tsyringe';

import { Product, Sale, SaleWithProducts } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { avoidDuplicateElements } from '../../../../util/avoidDuplicateElements';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { ICustomersRepository } from '../../../customers/repositories/ICustomersRepository';
import { IProductsSaleRepository } from '../../repositories/ISaleProductsRepository';
import { ISalesRepository } from '../../repositories/ISalesRepository';

interface IRequest {
    total: Decimal;
    value_pay: Decimal;
    descount: Decimal;
    sale_type: 'PENDING' | 'PAID_OUT';
    updated_at: Date;
    id_account: string;
    id_customer: string;
    products: Product[];
}

@injectable()
class CreateSaleUseCase {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,

        @inject('AccountsRepository')
        private accountsRepository: IAccountsRepository,

        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,

        @inject('SaleProductsRepository')
        private saleProductsRepository: IProductsSaleRepository,
    ) {}
    async execute({
        total,
        value_pay,
        descount,
        sale_type,
        updated_at,
        id_account,
        id_customer,
        products,
    }: IRequest): Promise<SaleWithProducts> {
        const accountExists = await this.accountsRepository.findById(
            id_account,
        );

        if (!accountExists) {
            throw new AppError('Account does not exists');
        }

        const customerExists = await this.customersRepository.findById(
            id_customer,
        );

        if (!customerExists) {
            throw new AppError('Customer does not exists');
        }

        if (products.length <= 0) {
            throw new AppError('Cannot create a sale without product');
        }

        const sale = (await this.salesRepository.create({
            total,
            value_pay,
            descount,
            sale_type,
            updated_at,
            id_account,
            id_customer,
        })) as Sale;

        // Evita produtos duplicados
        const newProducts = avoidDuplicateElements<Product>({
            elements: products,
        });

        newProducts.map(async product => {
            const newProduct = await this.saleProductsRepository.create({
                id_sale: sale.id as string,
                id_product: product.id as string,
                amount: product.amount as number,
                product_value: product.price,
            });

            return newProduct;
        });

        return {
            ...sale,
            products: newProducts,
        };
    }
}

export { CreateSaleUseCase };
