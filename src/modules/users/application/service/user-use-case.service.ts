import { Inject, Injectable } from '@nestjs/common';
import { InterfaceUseCaseUserService } from '../usecase/user-use-case.interface';
import { InterfaceUserRepository } from '../../domain/contracts/user.repository.interface';
import { UserRequest } from '../../domain/schemas/dto/request/user.request';
import { UserResponse } from '../../domain/schemas/dto/response/user.response';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserUseCaseService implements InterfaceUseCaseUserService{

  constructor(
    @Inject('UserRepository')
    private readonly userRepository: InterfaceUserRepository
  ) {
  }

  createUser(userRequest: UserRequest): Promise<UserResponse | null> {
    return this.userRepository.createUser(UserMapper.userRequestToUserModel(userRequest));
  }

  deleteUser(id_user: number): Promise<boolean> {
    return this.userRepository.deleteUser(id_user);
  }

  findAllUsers(): Promise<UserResponse[]> {
    return this.userRepository.findAllUsers();
  }

  updateUser(userRequest: UserRequest, email:string): Promise<UserResponse | null> {
    return this.userRepository.updateUser(UserMapper.userRequestToUserModel(userRequest), email);
  }

  findUserByEmail(email: string): Promise<UserResponse | null> {
    return this.userRepository.findUserByEmail(email);
  }
}