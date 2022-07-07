import { EnvironmentType, IPaginationResults } from '../@types';
import { Product } from '../database/entities';

const generateUrlProduct = {
    local: `${process.env.URL_LOCAL}`,
    s3: `${process.env.AWS_BUCKET_URL}`,
};

function getUrlProduct(typeEnvironment: EnvironmentType, image_name: string) {
    return `${generateUrlProduct[typeEnvironment]}/products/${image_name}`;
}

function addUrlInProduct(
    listProduct: IPaginationResults<Product[]>,
): IPaginationResults<Product[]> {
    const newListProducts = listProduct.data?.map((product: Product) => {
        return {
            ...product,
            url: getUrlProduct(
                process.env.DISK as EnvironmentType,
                product.image_name,
            ),
        };
    });

    return {
        ...listProduct,
        data: newListProducts,
    };
}

export { getUrlProduct, addUrlInProduct };
