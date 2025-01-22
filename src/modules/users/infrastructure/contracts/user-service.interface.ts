import { UserResponse } from '../../domain/schemas/dto/response/user.response';
import { UserModel } from '../../domain/schemas/model/user.model';


export interface InterfaceUserServiceRepository {
  findAllUsers(): Promise<UserResponse[]>;
  findUserByEmail(email: string): Promise<UserResponse | null>;
  createUser(userModel: UserModel): Promise<UserResponse | null>;
  updateUser(userModel: UserModel, email: string): Promise<UserResponse | null>;
  deleteUser(id_user: number): Promise<boolean>;
}
