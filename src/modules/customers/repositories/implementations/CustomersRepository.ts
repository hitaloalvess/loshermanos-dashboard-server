import { Customer } from '../../../../database/entities';
import { prismaClient } from '../../../../database/prismaClient';
import { ICreateCustomerDTO } from '../../dtos/ICreateCustomerDTO';
import { IUpdateCustomerDTO } from '../../dtos/IUpdateCustomerDTO';
import { ICustomersRepository } from '../ICustomersRepository';

class CustomersRepository implements ICustomersRepository {
    private repository;

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

    async update({
        name,
        cpf,
        road,
        district,
        number,
        city,
        phone,
        zip_code,
        id_customer,
    }: IUpdateCustomerDTO): Promise<Customer> {
        const customer = await this.repository.customer.update({
            data: {
                name,
                cpf,
                road,
                district,
                number,
                city,
                phone,
                zip_code,
            },
            where: {
                id: id_customer,
            },
        });

        return customer;
    }

    async deleteById(id_customer: string): Promise<Customer> {
        const deletedCustomer = await this.repository.customer.delete({
            where: {
                id: id_customer,
            },
        });

        return deletedCustomer;
    }

    async findByCpf(cpf: string, id_account: string): Promise<Customer> {
        const customer = (await this.repository.customer.findFirst({
            where: {
                cpf,
                id_account,
            },
        })) as Customer;

        return customer;
    }

    async findById(id_customer: string): Promise<Customer> {
        const customer = (await this.repository.customer.findFirst({
            where: {
                id: id_customer,
            },
        })) as Customer;

        return customer;
    }

    async findAll(id_account: string): Promise<Customer[]> {
        const customers = await this.repository.customer.findMany({
            where: {
                id_account,
            },
        });

        return customers;
    }
}

export { CustomersRepository };
