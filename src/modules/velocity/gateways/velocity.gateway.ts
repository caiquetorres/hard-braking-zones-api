import { UseGuards } from '@nestjs/common'
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'

import { Roles } from '../../../decorators/roles/roles.decorator'

import { JwtGuard } from '../../../guards/jwt/jwt.guard'
import { RoleGuard } from '../../../guards/role/role.guard'

import { RoleEnum } from '../../../models/enums/role.enum'
import { CreateVelocityDto } from '../dtos/create-velocity.dto'

import { VelocityService } from '../services/velocity.service'

@WebSocketGateway({
  namespace: 'velocity',
})
export class VelocityGateway {
  constructor(private readonly velocityService: VelocityService) {}

  @Roles(RoleEnum.common, RoleEnum.admin)
  @UseGuards(JwtGuard, RoleGuard)
  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody()
    data: CreateVelocityDto,
  ): Promise<void> {
    this.velocityService.createOne(data)
  }
}
