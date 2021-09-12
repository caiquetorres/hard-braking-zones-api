import { Body, Controller, Post } from '@nestjs/common'

import { CreateVelocityDto } from '../dtos/create-velocity.dto'

import { VelocityService } from '../services/velocity.service'

import { Observable } from 'rxjs'

@Controller('velocity')
export class VelocityController {
  constructor(private readonly velocityService: VelocityService) {}

  @Post()
  createOne(@Body() payload: CreateVelocityDto): Observable<void> {
    return this.velocityService.createOne(payload)
  }

  @Post('bulk')
  createMany(@Body() payload: CreateVelocityDto[]): Observable<void> {
    return this.velocityService.createMany(payload)
  }
}
