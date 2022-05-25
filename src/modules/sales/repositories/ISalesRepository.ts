import { Sale } from '@prisma/client';

import { ICreateSaleDTO } from '../dtos/ICreateSaleDTO';
import { IUpdateSaleDTO } from '../dtos/IUpdateSaleDTO';
import { IUpdateSalePaymentDTO } from '../dtos/IUpdateSalePaymentDTO';

interface ISalesRepository {
    create(data: ICreateSaleDTO): Promise<Sale>;
    update(data: IUpdateSaleDTO): Promise<Sale>;
    updatePayment(data: IUpdateSalePaymentDTO): Promise<Sale>;
    deleteById(id_sale: string): Promise<Sale>;
    findById(id_sale: string): Promise<Sale>;
    findAll(id_account: string): Promise<Sale[]>;
}

export { ISalesRepository };
