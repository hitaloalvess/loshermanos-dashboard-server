import { inject, injectable } from 'tsyringe';

import { Customer } from '../../../../database/entities';
import { AppError } from '../../../../shared/errors/AppError';
import { ICustomersRepository } from '../../repositories/ICustomersRepository';

@injectable()
class DeleteCustomerUseCase {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository,
    ) {}
    async execute(id_customer: string): Promise<Customer> {
        const customerExists = await this.customersRepository.findById(
            id_customer,
        );

        if (!customerExists) {
            throw new AppError('Customer does not exists');
        }

        const customer = this.customersRepository.deleteById(id_customer);

        return customer;
    }
}

export { DeleteCustomerUseCase };
