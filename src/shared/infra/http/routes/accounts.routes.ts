import { Router } from 'express';

import { CreateAccountWithAdminUserController } from '../../../../modules/accounts/useCases/createAccountWithAdminUser/CreateAccountWithAdminUserController';
import { CreatePermissionController } from '../../../../modules/accounts/useCases/createPermission/CreatePermissionController';
import { CreatePermissionRoleController } from '../../../../modules/accounts/useCases/createPermissionRole/CreatePermissionRoleController';
import { CreateRoleController } from '../../../../modules/accounts/useCases/createRole/CreateRoleController';
import ensuredAuthenticated from '../middlewares/ensuredAuthenticated';

const accountsRoutes = Router();

const createPermissionController = new CreatePermissionController();
const createRoleController = new CreateRoleController();
const createPermissionRoleController = new CreatePermissionRoleController();
const createAccountWithAdminUserController =
    new CreateAccountWithAdminUserController();

accountsRoutes.post('/role', ensuredAuthenticated, createRoleController.handle);
accountsRoutes.post(
    '/permission',
    ensuredAuthenticated,
    createPermissionController.handle,
);
accountsRoutes.post(
    '/permissionRole',
    ensuredAuthenticated,
    createPermissionRoleController.handle,
);
accountsRoutes.post('/account', createAccountWithAdminUserController.handle);

export { accountsRoutes };
