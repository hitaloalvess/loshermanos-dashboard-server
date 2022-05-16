import { Router } from 'express';

import { CreateAccountController } from '../../../../modules/accounts/useCases/createAccount/CreateAccountController';
import { CreateAccountWithAdminUserController } from '../../../../modules/accounts/useCases/createAccountWithAdminUser/CreateAccountWithAdminUserController';
import { CreatePermissionController } from '../../../../modules/accounts/useCases/createPermission/CreatePermissionController';
import { CreatePermissionRoleController } from '../../../../modules/accounts/useCases/createPermissionRole/CreatePermissionRoleController';
import { CreateRoleController } from '../../../../modules/accounts/useCases/createRole/CreateRoleController';
import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController';
import { ensuredAuthenticated } from '../middlewares/ensuredAuthenticated';

const accountsRoutes = Router();

const createPermissionController = new CreatePermissionController();
const createRoleController = new CreateRoleController();
const createPermissionRoleController = new CreatePermissionRoleController();
const createAccountWithAdminUserController =
    new CreateAccountWithAdminUserController();
const createUserController = new CreateUserController();

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
accountsRoutes.post('/user', ensuredAuthenticated, createUserController.handle);

export { accountsRoutes };
