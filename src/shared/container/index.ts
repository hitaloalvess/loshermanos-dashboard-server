import { container } from 'tsyringe';

import { AccountsRepository } from '../../modules/accounts/repositories/implementations/AccountsRepository';
import { PermissionsRepository } from '../../modules/accounts/repositories/implementations/PermissionsRepository';
import { PermissionsRolesRepository } from '../../modules/accounts/repositories/implementations/PermissionsRolesRepository';
import { RolesRepository } from '../../modules/accounts/repositories/implementations/RolesRepository';
import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository';
import { UsersTokensRepository } from '../../modules/accounts/repositories/implementations/UsersTokensRepository';
import { IPermissionsRepository } from '../../modules/accounts/repositories/IPermissionsRepository';
import { IRolesRepository } from '../../modules/accounts/repositories/IRolesRepository';
import { ProductsImageRepository } from '../../modules/products/repositories/implementations/ProductsImageRepository';
import { ProductsRepository } from '../../modules/products/repositories/implementations/ProductsRepository';

import './providers';

container.registerSingleton<IRolesRepository>(
    'RolesRepository',
    RolesRepository,
);

container.registerSingleton<IPermissionsRepository>(
    'PermissionsRepository',
    PermissionsRepository,
);

container.registerSingleton<PermissionsRolesRepository>(
    'PermissionsRolesRepository',
    PermissionsRolesRepository,
);

container.registerSingleton<AccountsRepository>(
    'AccountsRepository',
    AccountsRepository,
);

container.registerSingleton<UsersRepository>(
    'UsersRepository',
    UsersRepository,
);

container.registerSingleton<UsersTokensRepository>(
    'UsersTokensRepository',
    UsersTokensRepository,
);

container.registerSingleton<ProductsRepository>(
    'ProductsRepository',
    ProductsRepository,
);

container.registerSingleton<ProductsImageRepository>(
    'ProductsImageRepository',
    ProductsImageRepository,
);
