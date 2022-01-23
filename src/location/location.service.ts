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
   * Method that creates new location points in the influx database.
   *
   * @param payload defines an array that contains objects and each one of
   * them represents the the point data
   */
  createMany(payload: CreateLocationDto[]): Promise<void> {
    return this.influxService.createMany(payload)
  }
}
