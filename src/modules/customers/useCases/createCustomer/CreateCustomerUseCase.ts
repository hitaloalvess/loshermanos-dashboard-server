import { Customer } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IAccountsRepository } from '../../../accounts/repositories/IAccountsRepository';
import { ICreateCustomerDTO } from '../../dtos/ICreateCustomerDTO';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

@injectable()
class CreateCustomerUseCase {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,

        @inject('AccountsRepository')
        private accountsRepository: IAccountsRepository,
    ) {}
    async execute({
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
        const customerExists = await this.customersRepository.findByCpf(cpf);

        if (customerExists) {
            throw new AppError('There is already a customer with our cpf');
        }

        const accountExists = await this.accountsRepository.findById(
            id_account,
        );

        if (!accountExists) {
            throw new AppError('Account does not exists');
        }

        const customer = await this.customersRepository.create({
            name,
            cpf,
            road,
            district,
            number,
            city,
            phone,
            zip_code,
            id_account,
        });

        return customer;
    }
}

export { CreateCustomerUseCase };
