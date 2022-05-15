interface IUserWithRegisteredAccount {
    name: string;
    email: string;
    username: string;
    password: string;
    telefone: string;
    account: {
        id: string;
        name_stablishment: string;
        created_at: Date;
    };
    role: {
        id: string;
        name: string;
        description: string;
        created_at: Date;
    };
}

export { IUserWithRegisteredAccount };
