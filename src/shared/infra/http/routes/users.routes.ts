import { Router } from 'express';

import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController';
import { DeleteUserController } from '../../../../modules/accounts/useCases/deleteUser/DeleteUserController';
import { ListUsersLinkedToAccountController } from '../../../../modules/accounts/useCases/listUsersLinkedToAccount/ListUsersLinkedToAccountController';
import { UpdateUserController } from '../../../../modules/accounts/useCases/updateUser/UpdateUserController';
import ensuredAuthenticated from '../middlewares/ensuredAuthenticated';
import { is } from '../middlewares/permissions';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersLinkedToAccountController =
    new ListUsersLinkedToAccountController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

usersRoutes.post(
    '/',
    ensuredAuthenticated,
    is(['admin']),
    createUserController.handle,
);

usersRoutes.get(
    '/:id_account',
    ensuredAuthenticated,
    // is(['admin']),
    listUsersLinkedToAccountController.handle,
);

usersRoutes.put(
    '/:id_user',
    ensuredAuthenticated,
    is(['admin']),
    updateUserController.handle,
);

usersRoutes.delete(
    '/:id_user',
    ensuredAuthenticated,
    is(['admin']),
    deleteUserController.handle,
);

export { usersRoutes };
