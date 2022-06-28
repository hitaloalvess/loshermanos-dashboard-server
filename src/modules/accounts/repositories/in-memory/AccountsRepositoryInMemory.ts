import { v4 as uuid } from 'uuid';

import { Account } from '../../../../database/entities';
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

    async findByName(name_stablishment: string): Promise<Account> {
        const account = this.accounts.find(
            account => account.name_stablishment === name_stablishment,
        ) as Account;

        return Promise.resolve(account);
    }

    async findById(id: string): Promise<Account | null | undefined> {
        return Promise.resolve(
            this.accounts.find(account => account.id === id),
        );
    }
}

export { AccountsRepositoryInMemory };
