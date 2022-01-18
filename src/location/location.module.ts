import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'

import { LocationService } from './location.service'

import { LocationController } from './location.controller'

import { LocationGateway } from './location.gateway'
import { LocationProcessor } from './location.processor'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'location',
    }),
  ],
  controllers: [LocationController],
  providers: [LocationService, LocationGateway, LocationProcessor],
})
export class LocationModule {}
