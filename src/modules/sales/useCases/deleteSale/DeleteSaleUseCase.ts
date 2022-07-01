import { inject, injectable } from 'tsyringe';

import { Sale } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { IProductsSaleRepository } from '../../repositories/ISaleProductsRepository';
import { ISalesRepository } from '../../repositories/ISalesRepository';

@injectable()
class DeleteSaleUseCase {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,

        @inject('SaleProductsRepository')
        private saleProductsRepository: IProductsSaleRepository,
    ) {}
    async execute(id_sale: string): Promise<Sale> {
        const saleExists = await this.salesRepository.findById(id_sale);

        if (!saleExists) {
            throw new AppError('Sale does not exists');
        }

        await this.saleProductsRepository.deleteAllProductsSale(id_sale);

        const deletedSale = await this.salesRepository.deleteById(id_sale);

        return deletedSale;
    }
}

export { DeleteSaleUseCase };
