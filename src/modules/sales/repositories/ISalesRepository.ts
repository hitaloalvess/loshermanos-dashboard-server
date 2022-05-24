import { Sale } from '@prisma/client';

import { ICreateSaleDTO } from '../dtos/ICreateSaleDTO';

interface ISalesRepository {
    create(data: ICreateSaleDTO): Promise<Sale>;
    findById(id_sale: string): Promise<Sale>;
}

export { ISalesRepository };
