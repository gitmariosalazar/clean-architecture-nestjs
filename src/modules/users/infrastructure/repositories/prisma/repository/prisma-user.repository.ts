import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../../shared/prisma/prisma.service';
import { UserResponse } from '../../../../domain/schemas/dto/response/user.response';
import { InterfaceUserServiceRepository } from '../../../contracts/user-service.interface';
import { UserModel } from '../../../../domain/schemas/model/user.model';

@Injectable()
export class UserRepositoryPrismaImplementation implements InterfaceUserServiceRepository {

  constructor(
    private readonly prismaService: PrismaService,
  ) {
  }

  async createUser(userModel: UserModel): Promise<UserResponse | null> {
    console.log(userModel);
    const userCreated = await this.prismaService.user.create(
      {
        data: {
          address: userModel.getAddress(),
          email: userModel.getEmail(),
          firstname: userModel.getFirstname(),
          identification: userModel.getIdentification(),
          lastname: userModel.getLastname(),
          password: userModel.getPassword(),
          phone: userModel.getPhone(),

        },
      },
    );
    return userCreated ? {
      address: userCreated.address,
      email: userCreated.email,
      firstname: userCreated.firstname,
      identification: userCreated.identification,
      lastname: userCreated.lastname,
      password: userCreated.password,
      phone: userCreated.phone,
    } : null;
  }

  async deleteUser(id_user: number): Promise<boolean> {
    try {
      const result = await this.prismaService.user.delete({
        where: { id_user: parseInt(`${id_user}`, 10) },
      });
      console.log(result);
      return !!result;
    } catch (error) {
      if (error.code === 'P2025') {
        console.error(`Error: User with id ${id_user} does not exist. ${error.code}`);
        return false;
      }
      console.error('Unexpected error:', error);
      throw error;
    }
  }


  async findAllUsers(): Promise<UserResponse[]> {
    const result = await this.prismaService.user.findMany();
    return result.map(
      (user) => ({
        address: user.address,
        email: user.email,
        firstname: user.firstname,
        identification: user.identification,
        lastname: user.lastname,
        password: user.password,
        phone: user.phone,
      }),
    );
  }

  async findUserByEmail(email: string): Promise<UserResponse | null> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!user) return null;
    return {
      address: user.address,
      email: user.email,
      firstname: user.firstname,
      identification: user.identification,
      lastname: user.lastname,
      password: user.password,
      phone: user.phone,
    };

  }

  async updateUser(userModel: UserModel, email: string): Promise<UserResponse | null> {
    const user = await this.prismaService.user.update({
      data: {
        address: userModel.getAddress(),
        email: userModel.getEmail(),
        firstname: userModel.getFirstname(),
        identification: userModel.getIdentification(),
        lastname: userModel.getLastname(),
        password: userModel.getPassword(),
        phone: userModel.getPhone(),
      },
      where: { email: email },
    });
    if (!user) return null;
    return user ? user : null;
  }

}