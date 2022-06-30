import { Decimal } from '@prisma/client/runtime';

import { Account } from '../../../database/entities';

interface IProductResponseDTO {
    id?: string;
    description: string;
    price: Decimal;
    image_name: string;
    amount?: number;
    created_at?: Date;
    id_account: string;
    url: string;
    account?: Account;
}

export { IProductResponseDTO };
