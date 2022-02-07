import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private userService: UserService,
    private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneWithUsername(username);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any){
    const payload = {username: user.username, sub: user.id};
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
/*
    Warning!!!
    Of course in a real application, you wouldn't store a password in plain text.
    You'd instead use a library like bcrypt, with a salted one-way hash algorithm.
    With that approach, you'd only {store hashed passwords},
    and then compare the stored password to a hashed version of the incoming password,
    thus never storing or exposing user passwords in plain text. 
    To keep our sample app simple, we violate that absolute mandate and use plain text. 
    Don't do this in your real app!
*/
}
