import { Decimal } from '@prisma/client/runtime';
import { v4 as uuid } from 'uuid';

import { Account } from './Account';

class Product {
    id?: string;
    description!: string;
    price!: Decimal;
    image_name!: string;
    created_at!: Date;
    id_account!: string;
    account?: Account;
    amount?: number;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { Product };
