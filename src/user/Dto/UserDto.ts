import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { Column } from 'typeorm';

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
