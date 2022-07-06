import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../../../../config/upload';
import { CreateProductController } from '../../../../modules/products/useCases/createProduct/CreateProductController';
import { DeleteProductController } from '../../../../modules/products/useCases/deleteProduct/DeleteProductController';
import { ListAllProductsController } from '../../../../modules/products/useCases/listAllProducts/ListAllProductsController';
import { UpdateProductController } from '../../../../modules/products/useCases/updateProduct/UpdateProductController';
import { UploadProductImageController } from '../../../../modules/products/useCases/uploadProductImage/uploadProductImageController';
import ensuredAuthenticated from '../middlewares/ensuredAuthenticated';
import pagination from '../middlewares/pagination';
import { isAdmin } from '../middlewares/permissions';

const productsRoutes = Router();
const upload = multer(uploadConfig);

const uploadProductImageController = new UploadProductImageController();
const createProductController = new CreateProductController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();
const listAllProductsController = new ListAllProductsController();

productsRoutes.post(
    '/image',
    ensuredAuthenticated,
    isAdmin(true),
    upload.single('image_name'),
    uploadProductImageController.handle,
);

productsRoutes.post(
    '/',
    ensuredAuthenticated,
    isAdmin(true),
    createProductController.handle,
);

productsRoutes.put(
    '/:id_product',
    ensuredAuthenticated,
    isAdmin(true),
    updateProductController.handle,
);

productsRoutes.delete(
    '/:id_product',
    ensuredAuthenticated,
    isAdmin(true),
    deleteProductController.handle,
);

productsRoutes.get(
    '/:id_account',
    ensuredAuthenticated,
    pagination({ entity: 'products' }),
    listAllProductsController.handle,
);

export { productsRoutes };
