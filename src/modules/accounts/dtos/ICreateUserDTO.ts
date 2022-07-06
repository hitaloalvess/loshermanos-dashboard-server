interface ICreateUserDTO {
    id?: string;
    name: string;
    email: string;
    username: string;
    password: string;
    telefone: string;
    admin?: boolean;
    created_at?: Date;
    id_account: string;
}

export { ICreateUserDTO };
