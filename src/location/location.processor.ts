import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'

import { CreateLocationDto } from './dtos/create-location.dto'

import { LocationService } from './location.service'

import { Job } from 'bull'

@Processor('location')
export class LocationProcessor {
  private locations: CreateLocationDto[] = []

  constructor(private readonly locationService: LocationService) {}

  @Process()
  async save(job: Job<CreateLocationDto>): Promise<void> {
    this.locations.push(job.data)
    Logger.debug(this.locations.length)

    if (this.locations.length === 100) {
      Logger.debug('Saving locations')
      await this.locationService.createMany(this.locations)
      this.locations = []
    }
  }
}
