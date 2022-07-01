import { EnvironmentType } from '../@types';

const generateUrlProduct = {
    local: `${process.env.URL_LOCAL}`,
    s3: `${process.env.AWS_BUCKET_URL}`,
};

function getUrlProduct(typeEnvironment: EnvironmentType, image_name: string) {
    return `${generateUrlProduct[typeEnvironment]}/products/${image_name}`;
}

export { getUrlProduct };
