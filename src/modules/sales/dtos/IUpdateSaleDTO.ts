import { Sale_type } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

interface IUpdateSaleDTO {
    id_sale: string;
    total: Decimal;
    value_pay: Decimal;
    descount: Decimal;
    sale_type: Sale_type;
    updated_at: Date;
}

export { IUpdateSaleDTO };
