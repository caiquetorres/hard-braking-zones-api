import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'

import { CreateLocationDto } from './dtos/create-location.dto'

import { LocationService } from './location.service'

import { Job } from 'bull'

/**
 * Processor that manages the `location` queue.
 */
@Processor('location')
export class LocationProcessor {
  /**
   * Property that defines an array that contains all the locations that are
   * pending to be saved.
   */
  private locations: CreateLocationDto[] = []

  constructor(private readonly locationService: LocationService) {}

  /**
   * Method that saves some location in the peding `locations` array. After
   * some amount of locations saved, it saves all the pending at once.
   *
   * @param job defines an object that represents the current queue job.
   */
  @Process()
  async save(job: Job<CreateLocationDto>): Promise<void> {
    this.locations.push(job.data)
    Logger.debug(this.locations.length) // TODO: Remove this line after AWS/Heroku tests

    if (this.locations.length === 100) {
      Logger.debug('Saving locations') // TODO: Remove this line after AWS/Heroku tests
      await this.locationService.createMany(this.locations)
      this.locations = []
    }
  }
}
