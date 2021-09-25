import { Module } from '@nestjs/common'

import { VelocityService } from './services/velocity.service'

@Module({
  providers: [VelocityService],
  exports: [VelocityService],
})
export class VelocityModule {}
