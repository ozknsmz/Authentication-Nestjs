import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
    /* There are no configuration options, so our constructor simply calls super(), without an options object*/
  }
  async validate(username: string, password: string): Promise<any> {  // verify function
    const user = await this.authService.validateUser(username, password);   
    
    if (!user) {
      throw new UnauthorizedException({
        status: 401,
        message: 'Invalid username or password'
      });
    }
    return user;
  }
}
