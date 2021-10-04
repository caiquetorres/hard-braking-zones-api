import { Injectable } from '@nestjs/common'

import { CreateVelocityDto } from '../dtos/create-velocity.dto'

import { InfluxService } from '../../influx/services/influx.service'

/**
 * Service that deals with the velocity data.
 */
@Injectable()
export class VelocityService {
  constructor(private readonly influxService: InfluxService) {}

  /**
   * Method that creates a new velocity point in the influx database.
   *
   * @param payload defines an object that has the point data
   */
  createOne(payload: CreateVelocityDto): Promise<void> {
    return this.influxService.createOne(payload)
  }
}
