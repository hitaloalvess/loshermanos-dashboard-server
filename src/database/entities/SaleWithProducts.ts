import { Account } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { v4 as uuid } from 'uuid';

import { Customer } from './Customer';
import { Product } from './Product';

class SaleWithProducts {
    id?: string;
    total!: Decimal;
    value_pay!: Decimal;
    descount!: Decimal;
    sale_type?: 'PENDING' | 'PAID_OUT';
    updated_at!: Date;
    created_at?: Date;
    id_account!: string;
    account?: Account;
    id_customer!: string;
    customer?: Customer;

    products!: Product[];

    constructor() {
        if (!this.id) {
            this.id = uuid();
            this.created_at = new Date();
            this.updated_at = new Date();
        }

        if (!this.sale_type) {
            this.sale_type = 'PENDING';
        }
    }
}

export { SaleWithProducts };
