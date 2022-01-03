import { Module } from '@nestjs/common'

import { LocationService } from './location.service'

import { LocationGateway } from './location.gateway'

@Module({
  providers: [LocationService, LocationGateway],
})
export class LocationModule {}
