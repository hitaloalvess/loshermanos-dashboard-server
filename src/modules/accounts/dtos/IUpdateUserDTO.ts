interface IUpdateUserDTO {
    id_user: string;
    data: {
        name: string;
        email: string;
        username: string;
        password: string;
        telefone: string;
    };
}

export { IUpdateUserDTO };
