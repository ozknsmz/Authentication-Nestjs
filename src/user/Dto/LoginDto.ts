import { IsNotEmpty, IsString, Validate } from 'class-validator';

export class LoginDto {
  //Controller içerisinde @body() içerisine eklediğin validationpipe sayesinde hata mesajları otomatik döndürülür.

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
