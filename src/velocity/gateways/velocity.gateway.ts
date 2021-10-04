import { SkipThrottle } from '@nestjs/throttler'
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'

import { CreateVelocityDto } from '../dtos/create-velocity.dto'

import { VelocityService } from '../velocity.service'

/**
 * Gateway responsible for dealing with the velocity data receiving.
 */
@SkipThrottle()
@WebSocketGateway()
export class VelocityGateway {
  constructor(private readonly velocityService: VelocityService) {}

  /**
   * Method that creates a new velocity point in the influx database.
   *
   * @param dto defines an object that has the point data
   */
  @SubscribeMessage('velocity')
  async handleVelocity(
    @MessageBody()
    dto: CreateVelocityDto,
  ): Promise<void> {
    this.velocityService.createOne(dto)
  }
}
