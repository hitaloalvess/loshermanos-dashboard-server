import { Customer } from '@prisma/client';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IUpdateCustomerDTO } from '../../dtos/IUpdateCustomerDTO';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

@injectable()
class UpdateCustomerUseCase {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
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
        id_customer,
    }: IUpdateCustomerDTO): Promise<Customer> {
        const customerExists = await this.customersRepository.findById(
            id_customer,
        );

        if (!customerExists) {
            throw new AppError('Customer does not exists');
        }

        const customer = await this.customersRepository.update({
            name,
            cpf,
            road,
            district,
            number,
            city,
            phone,
            zip_code,
            id_customer,
        });

        return customer;
    }
}

export { UpdateCustomerUseCase };
