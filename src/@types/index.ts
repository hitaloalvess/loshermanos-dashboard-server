import { Product, Sale_type } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

interface IUserWithRegisteredAccount {
    id?: string;
    name: string;
    email: string;
    username: string;
    password: string;
    telefone: string;
    created_at?: Date;
    account: {
        id: string;
        name_stablishment: string;
        created_at: Date;
    };
    role: {
        id: string;
        name: string;
        description: string;
        created_at: Date;
    };
}

export { IUserWithRegisteredAccount };
