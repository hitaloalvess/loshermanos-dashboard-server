import { Router } from 'express';

import { CreateCustomerController } from '../../../../modules/customers/useCases/createCustomer/CreateCustomerControlle';
import ensuredAuthenticated from '../middlewares/ensuredAuthenticated';
import { is } from '../middlewares/permissions';

const customersRoutes = Router();

const createCustomerController = new CreateCustomerController();

customersRoutes.post(
    '/',
    ensuredAuthenticated,
    is(['admin']),
    createCustomerController.handle,
);

export { customersRoutes };
