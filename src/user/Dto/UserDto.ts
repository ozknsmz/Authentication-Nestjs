import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty({message: 'The name cannot empty!'})
  @IsString()
  @ApiProperty({
    required: true,
    description: 'The name'
  })
  name: string;

  // @IsNotEmpty()
  // @IsString()
  // @IsEmail()
  // @ApiProperty({
  //   required: true,
  //   description: 'User e-mail',
  //   example: 'john@doe.com',
  // })
  // email: string;

  @IsNotEmpty({message: 'The username cannot empty!'})
  @IsString()
  @ApiProperty({
    required: true,
    description: 'The username'
  })
  username: string;

  @IsNotEmpty({message: 'The password cannot empty!'})
  @IsString()
  @ApiProperty({
    required: true,
    description: 'User password',
    minLength: 7,
  })
  password: string;
}
