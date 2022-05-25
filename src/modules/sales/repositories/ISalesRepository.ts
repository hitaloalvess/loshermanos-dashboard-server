import { Sale } from '@prisma/client';

import { ICreateSaleDTO } from '../dtos/ICreateSaleDTO';
import { IUpdateSaleDTO } from '../dtos/IUpdateSaleDTO';

interface ISalesRepository {
    create(data: ICreateSaleDTO): Promise<Sale>;
    update(data: IUpdateSaleDTO): Promise<Sale>;
    findById(id_sale: string): Promise<Sale>;
}

export { ISalesRepository };
