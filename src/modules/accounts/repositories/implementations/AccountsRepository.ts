import { Account } from '../../../../database/entities';
import { prismaClient } from '../../../../database/prismaClient';
import { ICreateAccountDTO } from '../../dtos/ICreateAccountDTO';
import { IAccountsRepository } from '../IAccountsRepository';

class AccountsRepository implements IAccountsRepository {
    private repository;

    constructor() {
        this.repository = prismaClient;
    }

    async create({ name_stablishment }: ICreateAccountDTO): Promise<Account> {
        const account = await this.repository.account.create({
            data: {
                name_stablishment,
            },
        });

        return account;
    }

    async findByName(name_stablishment: string): Promise<Account> {
        const account = (await this.repository.account.findFirst({
            where: {
                name_stablishment,
            },
        })) as Account;

        return account;
    }

    async findById(id: string): Promise<Account | null | undefined> {
        return this.repository.account.findFirst({
            where: {
                id,
            },
        });
    }
}

export { AccountsRepository };
