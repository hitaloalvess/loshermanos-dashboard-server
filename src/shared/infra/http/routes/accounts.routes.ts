import { Router } from 'express';

import { CreateAccountWithAdminUserController } from '../../../../modules/accounts/useCases/createAccountWithAdminUser/CreateAccountWithAdminUserController';
import { CreatePermissionController } from '../../../../modules/accounts/useCases/createPermission/CreatePermissionController';
import { CreateRoleController } from '../../../../modules/accounts/useCases/createRole/CreateRoleController';

const accountsRoutes = Router();

const createPermissionController = new CreatePermissionController();
const createRoleController = new CreateRoleController();
const createAccountWithAdminUserController =
    new CreateAccountWithAdminUserController();

accountsRoutes.post('/role', createRoleController.handle);
accountsRoutes.post('/permission', createPermissionController.handle);
accountsRoutes.post('/account', createAccountWithAdminUserController.handle);

export { accountsRoutes };
