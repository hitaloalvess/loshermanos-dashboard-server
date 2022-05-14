import { Router } from 'express';

import { CreateAccountController } from '../../../../modules/accounts/useCases/createAccount/CreateAccountController';
import { CreatePermissionController } from '../../../../modules/accounts/useCases/createPermission/CreatePermissionController';
import { CreatePermissionRoleController } from '../../../../modules/accounts/useCases/createPermissionRole/CreatePermissionRoleController';
import { CreateRoleController } from '../../../../modules/accounts/useCases/createRole/CreateRoleController';
import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController';

const accountsRoutes = Router();

const createPermissionController = new CreatePermissionController();
const createRoleController = new CreateRoleController();
const createPermissionRoleController = new CreatePermissionRoleController();
const createAccountController = new CreateAccountController();
const createUserController = new CreateUserController();

accountsRoutes.post('/permission', createPermissionController.handle);
accountsRoutes.post('/role', createRoleController.handle);
accountsRoutes.post('/permissionRole', createPermissionRoleController.handle);
accountsRoutes.post('/account', createAccountController.handle);
accountsRoutes.post('/user', createUserController.handle);

export { accountsRoutes };
