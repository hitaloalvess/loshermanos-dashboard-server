import { Sale } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { ICreateSaleDTO } from '../../dtos/ICreateSaleDTO';
import { ISalesRepository } from '../ISalesRepository';

class SalesRepositoryInMemory implements ISalesRepository {
    private sales: Sale[] = [];
    async create({
        total,
        value_pay,
        descount,
        sale_type,
        updated_at,
        id_account,
        id_customer,
    }: ICreateSaleDTO): Promise<Sale> {
        const sale: Sale = {
            id: uuid(),
            total,
            value_pay,
            descount,
            sale_type,
            updated_at,
            created_at: new Date(),
            id_account,
            id_customer,
        };

        this.sales.push(sale);

        return Promise.resolve(sale);
    }

    async findById(id_sale: string): Promise<Sale> {
        const sale = this.sales.find(sale => sale.id === id_sale) as Sale;

        return Promise.resolve(sale);
    }
}

export { SalesRepositoryInMemory };
