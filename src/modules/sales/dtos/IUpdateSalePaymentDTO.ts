import { Decimal } from '@prisma/client/runtime';

interface IUpdateSalePaymentDTO {
    id_sale: string;
    value_pay: Decimal;
    sale_type?: 'PENDING' | 'PAID_OUT';
}

export { IUpdateSalePaymentDTO };
