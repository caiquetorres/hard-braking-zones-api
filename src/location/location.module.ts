import { Module } from '@nestjs/common'

import { LocationService } from './location.service'

import { LocationController } from './location.controller'

import { LocationGateway } from './location.gateway'

@Module({
  controllers: [LocationController],
  providers: [LocationService, LocationGateway],
})
export class LocationModule {}
