import { PrismaClient, Sale } from '@prisma/client';

import { prismaClient } from '../../../../database/prismaClient';
import { ICreateSaleDTO } from '../../dtos/ICreateSaleDTO';
import { IUpdateSaleDTO } from '../../dtos/IUpdateSaleDTO';
import { IUpdateSalePaymentDTO } from '../../dtos/IUpdateSalePaymentDTO';
import { ISalesRepository } from '../ISalesRepository';

class SalesRepository implements ISalesRepository {
    private repository: PrismaClient;

    constructor() {
        this.repository = prismaClient;
    }

    async create({
        total,
        value_pay,
        descount,
        sale_type,
        updated_at,
        id_account,
        id_customer,
    }: ICreateSaleDTO): Promise<Sale> {
        const sale = await this.repository.sale.create({
            data: {
                total,
                value_pay,
                descount,
                sale_type,
                updated_at,
                id_account,
                id_customer,
            },
        });

        return sale;
    }

    async update({
        total,
        value_pay,
        descount,
        sale_type,
        updated_at,
        id_sale,
    }: IUpdateSaleDTO): Promise<Sale> {
        const sale = await this.repository.sale.update({
            data: {
                total,
                value_pay,
                descount,
                sale_type,
                updated_at,
            },
            where: {
                id: id_sale,
            },
        });

        return sale;
    }

    async updatePayment({
        id_sale,
        value_pay,
        sale_type,
    }: IUpdateSalePaymentDTO): Promise<Sale> {
        const updatedSale = this.repository.sale.update({
            data: {
                value_pay,
                sale_type: sale_type || 'PENDING',
            },
            where: {
                id: id_sale,
            },
        });

        return updatedSale;
    }

    async findById(id_sale: string): Promise<Sale> {
        const sale = (await this.repository.sale.findFirst({
            where: {
                id: id_sale,
            },
        })) as Sale;

        return sale;
    }
}

export { SalesRepository };
