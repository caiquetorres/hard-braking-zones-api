import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { EnvService } from '../env/env.service'
import { AuthService } from './auth.service'
import { JwtStrategyService } from './strategies/jwt.strategy.service'
import { LocalStrategyService } from './strategies/local.strategy.service'

import { AuthController } from './auth.controller'

import { PasswordModule } from '../password/password.module'
import { UserModule } from '../user/user.module'

@Module({
  imports: [
    UserModule,
    PasswordModule,
    JwtModule.registerAsync({
      inject: [EnvService],
      useFactory: (envService: EnvService) => ({
        privateKey: envService.get('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategyService, JwtStrategyService],
})
export class AuthModule {}
