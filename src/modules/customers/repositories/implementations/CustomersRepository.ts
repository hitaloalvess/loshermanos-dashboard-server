import { Customer, PrismaClient } from '@prisma/client';

import { prismaClient } from '../../../../database/prismaClient';
import { ICreateCustomerDTO } from '../../dtos/ICreateCustomerDTO';
import { ICustomersRepository } from '../ICustomersRepository';

class CustomersRepository implements ICustomersRepository {
    private repository: PrismaClient;

    constructor() {
        this.repository = prismaClient;
    }
    async create({
        name,
        cpf,
        road,
        district,
        number,
        city,
        phone,
        zip_code,
        id_account,
    }: ICreateCustomerDTO): Promise<Customer> {
        const customer = await this.repository.customer.create({
            data: {
                name,
                cpf,
                road,
                district,
                number,
                city,
                phone,
                zip_code,
                id_account,
            },
        });

        return customer;
    }

    async findByCpf(cpf: string): Promise<Customer> {
        const customer = (await this.repository.customer.findFirst({
            where: {
                cpf,
            },
        })) as Customer;

        return customer;
    }
}

export { CustomersRepository };
