import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserUseCaseService } from '../../application/service/user-use-case.service';
import { UserResponse } from '../../domain/schemas/dto/response/user.response';
import { UserRequest } from '../../domain/schemas/dto/request/user.request';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userUseCaseService: UserUseCaseService,
  ) {
  }

  @Get()
  @ApiOperation({summary: 'Method GET - Find all users ✅'})
  async findAll(): Promise<UserResponse[]> {
    return this.userUseCaseService.findAllUsers();
  }

  @Get(':email')
  @ApiOperation({summary: 'Method GET - Find user with email address ✅' })
  async findOne(@Param('email') email: string): Promise<UserResponse> {
    return this.userUseCaseService.findUserByEmail(email);
  }

  @Post()
  @ApiOperation({summary: 'Method POST - create new user ✅' })
  async create(@Body() userRequest: UserRequest): Promise<UserResponse> {
    return this.userUseCaseService.createUser(userRequest);
  }

  @Put(':email')
  @ApiOperation({summary: 'Method PUT - Update user ✅' })
  async update(@Body() userRequest: UserRequest,@Param("email") email:string): Promise<UserResponse> {
    return this.userUseCaseService.updateUser(userRequest, email);
  }

  @Delete(':id_user')
  @ApiOperation({summary: 'Method DELETE - Delete user ✅' })
  async delete(@Param('id_user') id_user: number): Promise<boolean> {
    return this.userUseCaseService.deleteUser(id_user);
  }

}