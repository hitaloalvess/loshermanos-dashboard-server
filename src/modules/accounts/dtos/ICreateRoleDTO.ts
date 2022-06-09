interface ICreateRoleDTO {
    id?: string;
    name: string;
    description: string;
    created_at?: Date;
    id_account: string;
}

export { ICreateRoleDTO };
