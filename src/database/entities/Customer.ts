import { Account } from '@prisma/client';
import { v4 as uuid } from 'uuid';

class Customer {
    id?: string;
    name!: string;
    cpf!: string;
    road!: string;
    district!: string;
    number!: string;
    city!: string;
    phone!: string;
    zip_code!: string;
    created_at?: Date;
    id_account!: string;
    account?: Account;

    constructor() {
        if (!this.id) {
            this.id = uuid();
            this.created_at = new Date();
        }
    }
}

export { Customer };
