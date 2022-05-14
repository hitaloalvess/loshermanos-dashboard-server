import { Account } from '@prisma/client';

import { ICreateAccountDTO } from '../dtos/ICreateAccountDTO';

interface IAccountsRepository {
    create(data: ICreateAccountDTO): Promise<Account>;
    findByName(name_stablishment: string): Promise<Account | undefined | null>;
}

export { IAccountsRepository };
