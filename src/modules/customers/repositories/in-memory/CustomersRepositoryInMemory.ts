import { Customer } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { ICreateCustomerDTO } from '../../dtos/ICreateCustomerDTO';
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

    async findByCpf(cpf: string): Promise<Customer> {
        const customer = this.customers.find(
            customer => customer.cpf === cpf,
        ) as Customer;

        return Promise.resolve(customer);
    }
}

export { CustomersRepositoryInMemory };
