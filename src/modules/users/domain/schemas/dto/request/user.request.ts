import { ApiProperty } from '@nestjs/swagger';

export class UserRequest {
  @ApiProperty({
    example: '123 Main Street, Springfield',
    description: 'User’s residential address.',
  })
  public address: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User’s email address.',
    uniqueItems: true,
  })
  public email: string;

  @ApiProperty({
    example: 'John',
    description: 'User’s first name.',
  })
  public firstname: string;

  @ApiProperty({
    example: '123456789',
    description: 'User’s unique identification number.',
    uniqueItems: true,
  })
  public identification: string;

  @ApiProperty({
    example: 'Doe',
    description: 'User’s last name.',
  })
  public lastname: string;

  @ApiProperty({
    example: 'P@ssw0rd!',
    description: 'User’s password. Must be secure.',
  })
  public password: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'User’s phone number.',
  })
  public phone: string;
}
