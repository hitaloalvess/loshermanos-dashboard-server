import { Router } from 'express';

import { CreateCustomerController } from '../../../../modules/customers/useCases/createCustomer/CreateCustomerController';
import { DeleteCustomerController } from '../../../../modules/customers/useCases/deleteCustomer/DeleteCustomerController';
import { ListAllCustomersController } from '../../../../modules/customers/useCases/listAllCustomers/ListAllCustomersController';
import { ListCustomerByIdController } from '../../../../modules/customers/useCases/listCustomerById/ListCustomerByIdController';
import { UpdateCustomerController } from '../../../../modules/customers/useCases/updateCustomer/UpdateCustomerController';
import ensuredAuthenticated from '../middlewares/ensuredAuthenticated';
import { isAdmin } from '../middlewares/permissions';

const customersRoutes = Router();

const createCustomerController = new CreateCustomerController();
const updateCustomerController = new UpdateCustomerController();
const deleteCustomerController = new DeleteCustomerController();
const listAllCustomersController = new ListAllCustomersController();
const listCustomerById = new ListCustomerByIdController();

customersRoutes.post(
    '/',
    ensuredAuthenticated,
    isAdmin(true),
    createCustomerController.handle,
);

customersRoutes.put(
    '/:id_customer',
    ensuredAuthenticated,
    isAdmin(true),
    updateCustomerController.handle,
);

customersRoutes.delete(
    '/:id_customer',
    ensuredAuthenticated,
    isAdmin(true),
    deleteCustomerController.handle,
);

customersRoutes.get(
    '/all/:id_account',
    ensuredAuthenticated,
    listAllCustomersController.handle,
);

customersRoutes.get(
    '/:id_customer',
    ensuredAuthenticated,
    listCustomerById.handle,
);

export { customersRoutes };
