import { Decimal } from '@prisma/client/runtime';

interface ICreateProductDTO {
    description: string;
    price: Decimal;
    id_account: string;
}

export { ICreateProductDTO };
