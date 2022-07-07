import { Customer } from '../../../database/entities';
import { ICreateCustomerDTO } from '../dtos/ICreateCustomerDTO';
import { IUpdateCustomerDTO } from '../dtos/IUpdateCustomerDTO';

interface ICustomersRepository {
    create(data: ICreateCustomerDTO): Promise<Customer>;
    update(data: IUpdateCustomerDTO): Promise<Customer>;
    deleteById(id_customer: string): Promise<Customer>;
    findByCpf(cpf: string, id_account: string): Promise<Customer>;
    findById(id_customer: string): Promise<Customer>;
    findAll(id_account: string): Promise<Customer[]>;
}

export { ICustomersRepository };
