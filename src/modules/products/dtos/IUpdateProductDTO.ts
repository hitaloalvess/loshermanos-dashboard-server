import { Decimal } from '@prisma/client/runtime';

interface IUpdateProductDTO {
    description: string;
    price: Decimal;
    url_image: string;
    id_product: string;
}

export { IUpdateProductDTO };
