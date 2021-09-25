import { Injectable } from '@nestjs/common'

import { CreateVelocityDto } from '../dtos/create-velocity.dto'

import { InfluxService } from '../../influx/services/influx.service'

@Injectable()
export class VelocityService {
  constructor(private readonly influxService: InfluxService) {}

  createOne(payload: CreateVelocityDto): Promise<void> {
    return this.influxService.createOne(payload)
  }

  createMany(payload: CreateVelocityDto[]): Promise<void> {
    return this.influxService.createMany(payload)
  }
}
