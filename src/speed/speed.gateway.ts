import { UsePipes, ValidationPipe } from '@nestjs/common'
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'

import { CreateSpeedDto } from './dtos/create-speed.dto'

import { SpeedService } from './speed.service'

/**
 * Gateway responsible for dealing with the velocity data receiving.
 */
@WebSocketGateway({
  cors: true,
})
export class SpeedGateway {
  constructor(private readonly velocityService: SpeedService) {}

  /**
   * Method that creates a new velocity point in the influx database.
   *
   * @param dto defines an object that has the point data
   */
  @UsePipes(new ValidationPipe())
  @SubscribeMessage('speed')
  async handleVelocity(
    @MessageBody()
    dto: CreateSpeedDto,
  ): Promise<void> {
    this.velocityService.createOne(dto)
  }
}
