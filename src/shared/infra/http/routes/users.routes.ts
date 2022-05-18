import { Router } from 'express';

import { ListUsersLinkedToAccountController } from '../../../../modules/accounts/useCases/listUsersLinkedToAccount/ListUsersLinkedToAccountController';
import { UpdateUserController } from '../../../../modules/accounts/useCases/updateUser/UpdateUserController';
import ensuredAuthenticated from '../middlewares/ensuredAuthenticated';
import { is } from '../middlewares/permissions';

const usersRoutes = Router();

const listUsersLinkedToAccountController =
    new ListUsersLinkedToAccountController();
const updateUserController = new UpdateUserController();

usersRoutes.get(
    '/:id_account',
    ensuredAuthenticated,
    is('admin'),
    listUsersLinkedToAccountController.handle,
);

usersRoutes.put(
    '/:id_user',
    ensuredAuthenticated,
    is('admin'),
    updateUserController.handle,
);

export { usersRoutes };
