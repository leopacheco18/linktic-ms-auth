import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey', // Cambia por una clave secreta en tu entorno
    });
  }

  async validate(payload: any) {
    return {
      email: payload.email,
      role: payload.role,
      user_id: payload.user_id,
    };
  }
}
