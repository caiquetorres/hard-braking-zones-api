import { Injectable } from '@nestjs/common'

import { CreateVelocityDto } from '../dtos/create-velocity.dto'

import { InfluxService } from '../../influx/services/influx.service'

import { Observable } from 'rxjs'

@Injectable()
export class VelocityService {
  constructor(private readonly influxService: InfluxService) {}

  createOne(payload: CreateVelocityDto): Observable<void> {
    return this.influxService.createOne(payload)
  }

  createMany(payload: CreateVelocityDto[]): Observable<void> {
    return this.influxService.createMany(payload)
  }
}
