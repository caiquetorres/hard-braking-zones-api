import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'

import { CreateLocationDto } from './dtos/create-location.dto'

import { EnvService } from '../env/env.service'
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

  /**
   * Property that defines the data amount that must be sent to the influx
   * database.
   */
  private readonly maxCount: number

  constructor(
    envService: EnvService,
    private readonly locationService: LocationService,
  ) {
    this.maxCount = envService.get('LOCATIONS_MAX_COUNT')
  }

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

    if (this.locations.length === this.maxCount) {
      Logger.debug('Saving locations') // TODO: Remove this line after AWS/Heroku tests
      await this.locationService.createMany(this.locations)
      this.locations = []
    }
  }
}
