import { Sale_type } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

interface ICreateSaleDTO {
    id?: string;
    total: Decimal;
    value_pay: Decimal;
    descount: Decimal;
    sale_type: Sale_type;
    updated_at: Date;
    created_at?: Date;
    id_account: string;
    id_customer: string;
}

export { ICreateSaleDTO };
