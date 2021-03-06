interface ICreateCustomerDTO {
    id?: string;
    name: string;
    cpf: string;
    road: string;
    district: string;
    number: string;
    city: string;
    phone: string;
    zip_code: string;
    created_at?: Date;
    id_account: string;
}

export { ICreateCustomerDTO };
