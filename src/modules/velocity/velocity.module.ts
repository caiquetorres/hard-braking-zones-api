import { Module } from '@nestjs/common'

import { VelocityService } from './services/velocity.service'

import { VelocityGateway } from './gateways/velocity.gateway'

@Module({
  providers: [VelocityService, VelocityGateway],
  exports: [VelocityService],
})
export class VelocityModule {}
