import { Injectable } from '@nestjs/common'

import { CreateSpeedDto } from './dtos/create-speed.dto'

import { InfluxService } from '../influx/influx.service'

/**
 * Service that deals with the speed data.
 */
@Injectable()
export class SpeedService {
  constructor(private readonly influxService: InfluxService) {}

  /**
   * Method that creates a new speed point in the influx database.
   *
   * @param payload defines an object that has the point data
   */
  createOne(payload: CreateSpeedDto): Promise<void> {
    return this.influxService.createOne(payload)
  }
}
