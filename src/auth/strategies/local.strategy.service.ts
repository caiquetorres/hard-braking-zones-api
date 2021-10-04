import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { UserEntity } from '../../user/entities/user.entity'

import { AuthService } from '../auth.service'

import { Strategy, IStrategyOptions } from 'passport-local'

/**
 * Service that validates the email and password.
 */
@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    } as IStrategyOptions)
  }

  /**
   * Method that validates the sent email and password.
   *
   * @param email defines the sent email.
   * @param password defines the sent password.
   * @returns an object that represents the found user.
   */
  async validate(email: string, password: string): Promise<UserEntity> {
    return this.authService.validateLocal({ email, password })
  }
}
