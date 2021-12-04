import { Module } from '@nestjs/common'

import { SpeedService } from './speed.service'

import { SpeedGateway } from './speed.gateway'

@Module({
  providers: [SpeedService, SpeedGateway],
  exports: [SpeedService],
})
export class SpeedModule {}
