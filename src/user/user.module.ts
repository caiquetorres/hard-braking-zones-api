import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from './entities/user.entity'

import { UserService } from './user.service'

import { UserController } from './user.controller'

import { PasswordModule } from '../password/password.module'
import { PermissionModule } from '../permission/permission.module'

@Module({
  imports: [
    PasswordModule,
    PermissionModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
