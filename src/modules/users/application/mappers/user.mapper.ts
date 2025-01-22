import { UserModel } from '../../domain/schemas/model/user.model';
import { UserRequest } from '../../domain/schemas/dto/request/user.request';

export class UserMapper {
  static userRequestToUserModel(userRequest: UserRequest): UserModel {
    return new UserModel(
      userRequest.address,
      userRequest.email,
      userRequest.firstname,
      userRequest.identification,
      userRequest.lastname,
      userRequest.password,
      userRequest.phone,
    );
  }
}