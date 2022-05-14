import { Account } from '@prisma/client';
import { v4 as uuid } from 'uuid';

import { ICreateAccountDTO } from '../../dtos/ICreateAccountDTO';
import { IAccountsRepository } from '../IAccountsRepository';

class AccountsRepositoryInMemory implements IAccountsRepository {
    private accounts: Account[] = [];

    async create({ name_stablishment }: ICreateAccountDTO): Promise<Account> {
        const account: Account = {
            id: uuid(),
            name_stablishment,
            created_at: new Date(),
        };

        this.accounts.push(account);

        return Promise.resolve(account);
    }

    async findByName(
        name_stablishment: string,
    ): Promise<Account | undefined | null> {
        return Promise.resolve(
            this.accounts.find(
                account => account.name_stablishment === name_stablishment,
            ),
        );
    }
}

export { AccountsRepositoryInMemory };
