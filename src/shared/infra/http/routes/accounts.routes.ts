import { Router } from 'express';

import { CreatePermissionController } from '../../../../modules/accounts/useCases/createPermission/CreatePermissionController';
import { CreatePermissionRoleController } from '../../../../modules/accounts/useCases/createPermissionRole/CreatePermissionRoleController';
import { CreateRoleController } from '../../../../modules/accounts/useCases/createRole/CreateRoleController';

const accountsRoutes = Router();

const createPermissionController = new CreatePermissionController();
const createRoleController = new CreateRoleController();
const createPermissionRoleController = new CreatePermissionRoleController();

accountsRoutes.post('/permission', createPermissionController.handle);
accountsRoutes.post('/role', createRoleController.handle);
accountsRoutes.post('/permissionRole', createPermissionRoleController.handle);

export { accountsRoutes };
