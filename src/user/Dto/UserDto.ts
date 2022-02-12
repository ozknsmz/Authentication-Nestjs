import { Role, Role_type } from '@prisma/client';
import { IsNotEmpty, IsString, Validate } from 'class-validator';

export class UserDto {
  //Controller içerisinde @body() içerisine eklediğin validationpipe sayesinde hata mesajları otomatik döndürülür.

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsNotEmpty()
  @IsString()  // TODO: Unique olma durumunu araştır.https://showcase.ognicki.online/typescript/entities/users/dto/login-user__dto__ts/
  public username: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  public user_role: Role_type;

  // @IsNotEmpty()
  // @IsString()
  // @IsEmail()
  // @ApiProperty({
  //   required: true,
  //   description: 'User e-mail',
  //   example: 'john@doe.com',
  // })
  // email: string;
}
