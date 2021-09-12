import { Module } from '@nestjs/common'

import { VelocityService } from './services/velocity.service'

import { VelocityController } from './controllers/velocity.controller'

@Module({
  controllers: [VelocityController],
  providers: [VelocityService],
  exports: [VelocityService],
})
export class VelocityModule {}
