import { Decimal } from '@prisma/client/runtime';

interface ICreateProductDTO {
    description: string;
    price: number;
    id_account: string;
}

export { ICreateProductDTO };
