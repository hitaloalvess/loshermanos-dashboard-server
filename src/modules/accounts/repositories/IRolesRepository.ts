import { Role } from '../../../database/entities';
import { ICreateRoleDTO } from '../dtos/ICreateRoleDTO';

interface IRolesRepository {
    create(data: ICreateRoleDTO): Promise<Role>;
    findByName(name: string): Promise<Role>;
    findById(id: string): Promise<Role>;
    findAll(id_account: string): Promise<Role[]>;
}

export { IRolesRepository };
