import { Decimal } from '@prisma/client/runtime';
import { inject, injectable } from 'tsyringe';

import { Sale } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { ISalesRepository } from '../../repositories/ISalesRepository';

interface IRequest {
    id_sale: string;
    value_pay: Decimal;
}

@injectable()
class SalePaymentUseCase {
    constructor(
        @inject('SalesRepository')
        private salesRepository: ISalesRepository,
    ) {}

    async execute({ id_sale, value_pay }: IRequest): Promise<Sale> {
        const sale = await this.salesRepository.findById(id_sale);

        if (!sale) {
            throw new AppError('Sale does not exists');
        }

        const calc_payment = Number(sale.value_pay) + Number(value_pay);
        const new_value_pay = new Decimal(calc_payment);

        const saleWasFullyPaid = !(Number(sale.total) > calc_payment);

        let updatedSale: Sale;

        if (saleWasFullyPaid) {
            updatedSale = await this.salesRepository.updatePayment({
                id_sale,
                value_pay: new_value_pay,
                sale_type: 'PAID_OUT',
            });
        } else {
            updatedSale = await this.salesRepository.updatePayment({
                id_sale,
                value_pay: new_value_pay,
            });
        }

        return updatedSale;
    }
}

export { SalePaymentUseCase };
