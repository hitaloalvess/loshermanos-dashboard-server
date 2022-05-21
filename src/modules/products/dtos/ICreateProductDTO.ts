import { Decimal } from '@prisma/client/runtime';

interface ICreateProductDTO {
    description: string;
    price: Decimal;
    url_image: string;
    id_account: string;
}

export { ICreateProductDTO };
