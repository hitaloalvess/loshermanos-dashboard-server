import { Decimal } from '@prisma/client/runtime';

interface IUpdateProductDTO {
    description: string;
    price: Decimal;
    image_name: string;
    id_product: string;
}

export { IUpdateProductDTO };
