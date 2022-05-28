import { Router } from 'express';

import { CreateAccountController } from '../../../../modules/accounts/useCases/createAccount/CreateAccountController';
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
const createAccountController = new CreateAccountController();

accountsRoutes.post('/role', createRoleController.handle);
accountsRoutes.post('/permission', createPermissionController.handle);
accountsRoutes.post('/permissionRole', createPermissionRoleController.handle);
accountsRoutes.post(
    '/accountWithAdminUser',
    createAccountWithAdminUserController.handle,
);
accountsRoutes.post('/account', createAccountController.handle);

export { accountsRoutes };
