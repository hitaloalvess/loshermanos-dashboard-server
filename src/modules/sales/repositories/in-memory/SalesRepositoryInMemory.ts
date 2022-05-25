import { Sale } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { v4 as uuid } from 'uuid';

import { ICreateSaleDTO } from '../../dtos/ICreateSaleDTO';
import { IUpdateSaleDTO } from '../../dtos/IUpdateSaleDTO';
import { IUpdateSalePaymentDTO } from '../../dtos/IUpdateSalePaymentDTO';
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

    async update({
        total,
        value_pay,
        descount,
        sale_type,
        updated_at,
        id_sale,
    }: IUpdateSaleDTO): Promise<Sale> {
        const sale = this.sales.find(sale => sale.id === id_sale) as Sale;
        const index = this.sales.indexOf(sale);

        const newSale: Sale = {
            ...sale,
            total,
            value_pay,
            descount,
            sale_type,
            updated_at,
        };

        this.sales.splice(index, 1, newSale);

        return Promise.resolve(newSale);
    }

    async updatePayment({
        id_sale,
        value_pay,
        sale_type,
    }: IUpdateSalePaymentDTO): Promise<Sale> {
        const sale = this.sales.find(sale => sale.id === id_sale) as Sale;
        const index = this.sales.indexOf(sale);

        const updatedSale: Sale = {
            ...sale,
            value_pay: new Decimal(Number(sale.value_pay) + Number(value_pay)),
            sale_type: sale_type || sale.sale_type,
        };

        this.sales.splice(index, 1, updatedSale);

        return Promise.resolve(updatedSale);
    }

    async deleteById(id_sale: string): Promise<Sale> {
        const deletedSale = this.sales.find(
            sale => sale.id === id_sale,
        ) as Sale;
        const index = this.sales.indexOf(deletedSale);

        this.sales.splice(index, 1);

        return Promise.resolve(deletedSale);
    }

    async findById(id_sale: string): Promise<Sale> {
        const sale = this.sales.find(sale => sale.id === id_sale) as Sale;

        return Promise.resolve(sale);
    }

    async findAll(id_account: string): Promise<Sale[]> {
        const sales = this.sales.filter(sale => sale.id_account === id_account);

        return Promise.resolve(sales);
    }
}

export { SalesRepositoryInMemory };
