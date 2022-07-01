import { Decimal } from '@prisma/client/runtime';

interface ICreateSaleDTO {
    id?: string;
    total: Decimal;
    value_pay: Decimal;
    descount: Decimal;
    sale_type: 'PENDING' | 'PAID_OUT';
    updated_at: Date;
    created_at?: Date;
    id_account: string;
    id_customer: string;
}

export { ICreateSaleDTO };
