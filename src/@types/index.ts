interface IUserWithRegisteredAccount {
    id?: string;
    name: string;
    email: string;
    username: string;
    password: string;
    telefone: string;
    created_at?: Date;
    account: {
        id?: string;
        name_stablishment: string;
        created_at?: Date;
    };
}

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

export {
    IUserWithRegisteredAccount,
    IFunFindAllParams,
    IPaginationResults,
    EnvironmentType,
};
