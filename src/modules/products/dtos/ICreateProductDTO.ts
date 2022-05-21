import { Decimal } from '@prisma/client/runtime';

interface ICreateProductDTO {
    description: string;
    price: Decimal;
    image_name: string;
    id_account: string;
}

export { ICreateProductDTO };
