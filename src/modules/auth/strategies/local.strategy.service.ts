import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { UserEntity } from '../../user/entities/user.entity'

import { AuthService } from '../services/auth.service'

import { Strategy, IStrategyOptions } from 'passport-local'

@Injectable()
export class LocalStrategyService extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
    } as IStrategyOptions)
  }

  async validate(email: string, password: string): Promise<UserEntity> {
    return this.authService.validateLocal({ email, password })
  }
}
