import { Injectable } from '@nestjs/common'

import { CreateLocationDto } from './dtos/create-location.dto'

import { InfluxService } from '../influx/influx.service'

/**
 * Service that deals with the location data.
 */
@Injectable()
export class LocationService {
  constructor(private readonly influxService: InfluxService) {}

  /**
   * Method that creates a new location point in the influx database.
   *
   * @param payload defines an object that has the point data
   */
  createOne(payload: CreateLocationDto): Promise<void> {
    return this.influxService.createOne(payload)
  }
}
