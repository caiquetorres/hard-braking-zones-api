import { UsePipes, ValidationPipe } from '@nestjs/common'
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'

import { CreateSpeedDto } from './dtos/create-speed.dto'

import { SpeedService } from './speed.service'

/**
 * Gateway responsible for dealing with the speed data receiving.
 */
@WebSocketGateway({
  cors: true,
})
export class SpeedGateway {
  constructor(private readonly speedService: SpeedService) {}

  /**
   * Method that creates a new speed point in the influx database.
   *
   * @param dto defines an object that has the point data
   */
  @UsePipes(new ValidationPipe())
  @SubscribeMessage('speed')
  async handleSpeed(
    @MessageBody()
    dto: CreateSpeedDto,
  ): Promise<void> {
    this.speedService.createOne(dto)
  }
}
