import { UserResponse } from '../../domain/schemas/dto/response/user.response';
import { UserRequest } from '../../domain/schemas/dto/request/user.request';

export interface InterfaceUseCaseUserService {
  findAllUsers(): Promise<UserResponse[]>;
  findUserByEmail(email: string): Promise<UserResponse | null>;
  createUser(userRequest: UserRequest): Promise<UserResponse | null>;
  updateUser(userRequest: UserRequest, email: string): Promise<UserResponse | null>;
  deleteUser(id_user: number): Promise<boolean>;
}