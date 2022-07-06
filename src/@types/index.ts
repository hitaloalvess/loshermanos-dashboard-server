interface IFunFindAllParams {
    id_account: string;
    page?: number;
    limit?: number;
}

interface IPaginationResults<T> {
    next?: {
        page: number;
        limit: number;
    };
    previous?: {
        page: number;
        limit: number;
    };
    totalPage?: number;
    data?: T;
}

type EnvironmentType = 's3' | 'local';

export { IFunFindAllParams, IPaginationResults, EnvironmentType };
