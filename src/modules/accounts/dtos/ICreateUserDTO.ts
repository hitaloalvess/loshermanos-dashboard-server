interface ICreateUserDTO {
    id?: string;
    name: string;
    email: string;
    username: string;
    password: string;
    telefone: string;
    created_at?: Date;
    id_account: string;
}

export { ICreateUserDTO };
