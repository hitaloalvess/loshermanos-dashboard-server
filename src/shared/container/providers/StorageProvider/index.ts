import { container } from 'tsyringe';

import { LocalStorageProvider } from './implementations/LocalStorageProvider';

// const diskStorage = {
//     local: LocalStorageProvider,
//     // s3: S3StorageProvider,
// };

container.registerSingleton('StorageProvider', LocalStorageProvider);
