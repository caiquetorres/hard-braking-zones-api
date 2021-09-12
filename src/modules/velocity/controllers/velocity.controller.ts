import { Body, Controller, Post } from '@nestjs/common'

import { CreateVelocityDto } from '../dtos/create-velocity.dto'

import { VelocityService } from '../services/velocity.service'

@Controller('velocity')
export class VelocityController {
  constructor(private readonly velocityService: VelocityService) {}

  @Post()
  async createOne(@Body() payload: CreateVelocityDto): Promise<void> {
    await this.velocityService.createOne(payload)
  }

  @Post('bulk')
  async createMany(@Body() payload: CreateVelocityDto[]): Promise<void> {
    await this.velocityService.createMany(payload)
  }
}
