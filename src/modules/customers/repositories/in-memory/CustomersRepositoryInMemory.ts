import { Customer } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { ICreateCustomerDTO } from '../../dtos/ICreateCustomerDTO';
import { IUpdateCustomerDTO } from '../../dtos/IUpdateCustomerDTO';
import { ICustomersRepository } from '../ICustomersRepository';

class CustomersRepositoryInMemory implements ICustomersRepository {
    private customers: Customer[] = [];

    create({
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
        const customer: Customer = {
            id: uuid(),
            name,
            cpf,
            road,
            district,
            number,
            city,
            phone,
            zip_code,
            created_at: new Date(),
            id_account,
        };

        this.customers.push(customer);

        return Promise.resolve(customer);
    }

    update({
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
        const customer = this.customers.find(
            customer => customer.id === id_customer,
        ) as Customer;
        const index = this.customers.indexOf(customer);

        const newCustomer: Customer = {
            ...customer,
            name,
            cpf,
            road,
            district,
            number,
            city,
            phone,
            zip_code,
        };

        this.customers.splice(index, 1, newCustomer);

        return Promise.resolve(newCustomer);
    }

    async findByCpf(cpf: string): Promise<Customer> {
        const customer = this.customers.find(
            customer => customer.cpf === cpf,
        ) as Customer;

        return Promise.resolve(customer);
    }

    async findById(id_customer: string): Promise<Customer> {
        const customer = this.customers.find(
            customer => customer.id === id_customer,
        ) as Customer;

        return Promise.resolve(customer);
    }

    async deleteById(id_customer: string): Promise<Customer> {
        const customer = this.customers.find(
            customer => customer.id === id_customer,
        ) as Customer;
        const index = this.customers.indexOf(customer);

        this.customers.splice(index, 1);

        return Promise.resolve(customer);
    }

    async findAll(id_account: string): Promise<Customer[]> {
        const customers = this.customers.filter(
            customer => customer.id_account === id_account,
        );

        return Promise.resolve(customers);
    }
}

export { CustomersRepositoryInMemory };
