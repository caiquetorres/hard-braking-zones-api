import { Injectable } from '@nestjs/common'

import { CreateVelocityDto } from '../dtos/create-velocity.dto'

import { InfluxService } from '../../influx/services/influx.service'

@Injectable()
export class VelocityService {
  constructor(private readonly influxService: InfluxService) {}

  async createOne(payload: CreateVelocityDto): Promise<void> {
    await this.influxService.createOne(payload)
  }

  async createMany(payload: CreateVelocityDto[]): Promise<void> {
    await this.influxService.createMany(payload)
  }
}
