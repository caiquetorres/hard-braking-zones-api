import { Module } from '@nestjs/common'

import { VelocityService } from './velocity.service'

import { VelocityGateway } from './velocity.gateway'

@Module({
  providers: [VelocityService, VelocityGateway],
  exports: [VelocityService],
})
export class VelocityModule {}
