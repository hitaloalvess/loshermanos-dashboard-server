import { Decimal } from '@prisma/client/runtime';

interface ICreateSaleProductDTO {
    id_sale: string;
    id_product: string;
    amount: number;
}

export { ICreateSaleProductDTO };
