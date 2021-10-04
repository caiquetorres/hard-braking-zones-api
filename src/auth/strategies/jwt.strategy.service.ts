import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { UserEntity } from '../../user/entities/user.entity'

import { EnvService } from '../../env/env.service'
import { AuthService } from '../auth.service'

import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'

/**
 * Service that validates the jwt token sent by the request user.
 */
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

  /**
   * Method that validates the jwt request user.
   *
   * @param user defines an object that represents the request user.
   * @returns an object that represents the logged user.
   */
  async validate(user: UserEntity): Promise<UserEntity> {
    return this.authService.validateJwt(user)
  }
}
