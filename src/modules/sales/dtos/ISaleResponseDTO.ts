import { Sale_type } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

import { Product } from '../../../database/entities';

interface ISaleResponseDTO {
    id?: string;
    total: Decimal;
    value_pay: Decimal;
    descount: Decimal;
    sale_type: Sale_type;
    updated_at: Date;
    created_at?: Date;
    id_account: string;
    id_customer: string;
    products: Product[];
}

export { ISaleResponseDTO };
