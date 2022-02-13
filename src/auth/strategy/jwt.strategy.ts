import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  //This strategy requires some initialization, so we do that by passing in an options object in the super() call. 
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // API isteklerini yetkilendirme işlemi.
      ignoreExpiration: false, // Bir jwt'nin süresinin dolması durumunda 401 hatası döndürür.
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any){
      return{
          ...payload
      };
  }
}
 