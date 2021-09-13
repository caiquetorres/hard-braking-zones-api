import { Module } from '@nestjs/common'

import { UserService } from './services/user.service'

import { UserController } from './controllers/user.controller'

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
