import { Decimal } from '@prisma/client/runtime';

interface ICreateSaleProductDTO {
    id_sale: string;
    id_product: string;
    amount: number;
    product_value: Decimal;
}

export { ICreateSaleProductDTO };
