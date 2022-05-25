import { Sale_type } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

interface IUpdateSalePaymentDTO {
    id_sale: string;
    value_pay: Decimal;
    sale_type?: Sale_type;
}

export { IUpdateSalePaymentDTO };
