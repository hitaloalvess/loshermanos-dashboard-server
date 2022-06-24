import { Sale } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ISalesRepository } from '../../repositories/ISalesRepository';

@injectable()
class ListSaleByIdUseCase {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,
    ) {}

    async execute(id: string): Promise<Sale> {
        const sale = await this.salesRepository.findById(id);

        if (!sale) {
            throw new AppError('Sale does not exists');
        }

        return sale;
    }
}

export { ListSaleByIdUseCase };
