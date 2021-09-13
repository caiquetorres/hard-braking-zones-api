import { Module } from '@nestjs/common'

import { PasswordService } from './services/password.service'

@Module({
  providers: [PasswordService],
  exports: [PasswordService],
})
export class PasswordModule {}
