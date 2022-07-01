import { Router } from 'express';

import { CreateAccountWithAdminUserController } from '../../../../modules/accounts/useCases/createAccountWithAdminUser/CreateAccountWithAdminUserController';
import { CreateRoleController } from '../../../../modules/accounts/useCases/createRole/CreateRoleController';
import { ListRolesController } from '../../../../modules/accounts/useCases/listRoles/ListRolesController';

const accountsRoutes = Router();

const listARolesController = new ListRolesController();
const createRoleController = new CreateRoleController();
const createAccountWithAdminUserController =
    new CreateAccountWithAdminUserController();

accountsRoutes.post('/role', createRoleController.handle);
accountsRoutes.get('/role/:id_account', listARolesController.handle);
accountsRoutes.post('/account', createAccountWithAdminUserController.handle);

export { accountsRoutes };
