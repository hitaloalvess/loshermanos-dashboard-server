import { Router } from 'express';

import { CreateUserController } from '../../../../modules/accounts/useCases/createUser/CreateUserController';
import { DeleteUserController } from '../../../../modules/accounts/useCases/deleteUser/DeleteUserController';
import { ListUsersLinkedToAccountController } from '../../../../modules/accounts/useCases/listUsersLinkedToAccount/ListUsersLinkedToAccountController';
import { UpdateUserController } from '../../../../modules/accounts/useCases/updateUser/UpdateUserController';
import ensuredAuthenticated from '../middlewares/ensuredAuthenticated';
import { isAdmin } from '../middlewares/permissions';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const listUsersLinkedToAccountController =
    new ListUsersLinkedToAccountController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

usersRoutes.post(
    '/',
    ensuredAuthenticated,
    isAdmin(true),
    createUserController.handle,
);

usersRoutes.get(
    '/:id_account',
    ensuredAuthenticated,
    listUsersLinkedToAccountController.handle,
);

usersRoutes.put(
    '/:id_user',
    ensuredAuthenticated,
    isAdmin(true),
    updateUserController.handle,
);

usersRoutes.delete(
    '/:id_user',
    ensuredAuthenticated,
    isAdmin(true),
    deleteUserController.handle,
);

export { usersRoutes };
