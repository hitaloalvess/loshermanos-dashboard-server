import { Customer } from '@prisma/client';

import { ICreateCustomerDTO } from '../dtos/ICreateCustomerDTO';
import { IUpdateCustomerDTO } from '../dtos/IUpdateCustomerDTO';

interface ICustomersRepository {
    create(data: ICreateCustomerDTO): Promise<Customer>;
    update(data: IUpdateCustomerDTO): Promise<Customer>;
    findByCpf(cpf: string): Promise<Customer>;
    findById(id_customer: string): Promise<Customer>;
}

export { ICustomersRepository };
