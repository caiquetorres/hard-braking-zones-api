import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { EnvService } from '../env/services/env.service'
import { AuthService } from './services/auth.service'

import { AuthController } from './controllers/auth.controller'

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
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
