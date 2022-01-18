import { InjectQueue } from '@nestjs/bull'
import { UsePipes, ValidationPipe } from '@nestjs/common'
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'

import { CreateLocationDto } from './dtos/create-location.dto'

import { Queue } from 'bull'

/**
 * Gateway responsible for dealing with the velocity data receiving.
 */
@WebSocketGateway({
  cors: true,
})
export class LocationGateway {
  constructor(
    @InjectQueue('location')
    private readonly queue: Queue,
  ) {}

  /**
   * Method that creates a new velocity point in the influx database.
   *
   * @param dto defines an object that has the point data
   */
  @UsePipes(new ValidationPipe())
  @SubscribeMessage('location')
  async handleLocation(
    @MessageBody()
    dto: CreateLocationDto,
  ): Promise<void> {
    await this.queue.add(dto)
  }
}
