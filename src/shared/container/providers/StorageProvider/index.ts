import { container } from 'tsyringe';

import { EnvironmentType } from '../../../../@types';
import { LocalStorageProvider } from './implementations/LocalStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';

const diskStorage = {
    local: LocalStorageProvider,
    s3: S3StorageProvider,
};

container.registerSingleton(
    'StorageProvider',
    diskStorage[`${process.env.DISK as EnvironmentType}`],
);
