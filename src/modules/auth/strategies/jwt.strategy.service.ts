import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { UserEntity } from '../../user/entities/user.entity'

import { EnvService } from '../../env/services/env.service'
import { AuthService } from '../services/auth.service'

import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    envService: EnvService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envService.get('JWT_SECRET'),
      expiresIn: envService.get('JWT_EXPIRES_IN'),
    } as StrategyOptions)
  }

  async validate(user: UserEntity): Promise<UserEntity> {
    return this.authService.validateJwt(user)
  }
}
