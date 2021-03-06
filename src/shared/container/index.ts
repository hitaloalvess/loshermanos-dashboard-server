import { container } from 'tsyringe';

import { AccountsRepository } from '../../modules/accounts/repositories/implementations/AccountsRepository';
import { UsersRepository } from '../../modules/accounts/repositories/implementations/UsersRepository';
import { UsersTokensRepository } from '../../modules/accounts/repositories/implementations/UsersTokensRepository';
import { CustomersRepository } from '../../modules/customers/repositories/implementations/CustomersRepository';
import { ProductsRepository } from '../../modules/products/repositories/implementations/ProductsRepository';
import { SaleProductsRepository } from '../../modules/sales/repositories/implementations/SaleProductsRepository';
import { SalesRepository } from '../../modules/sales/repositories/implementations/SalesRepository';

import './providers';

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

container.registerSingleton<CustomersRepository>(
    'CustomersRepository',
    CustomersRepository,
);

container.registerSingleton<SalesRepository>(
    'SalesRepository',
    SalesRepository,
);

container.registerSingleton<SaleProductsRepository>(
    'SaleProductsRepository',
    SaleProductsRepository,
);
