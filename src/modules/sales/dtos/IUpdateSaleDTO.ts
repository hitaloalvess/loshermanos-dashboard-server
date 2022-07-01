import { Decimal } from '@prisma/client/runtime';

interface IUpdateSaleDTO {
    id_sale: string;
    total: Decimal;
    value_pay: Decimal;
    descount: Decimal;
    sale_type: 'PENDING' | 'PAID_OUT';
    updated_at: Date;
}

export { IUpdateSaleDTO };
