import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import { ProtectTo } from '../common/decorators/protect-to/protect-to.decorator'

import { KeyValueEntity } from '../key-value/entities/key-value.entity'

import { RoleEnum } from '../common/models/enums/role.enum'
import { CreateInfoDto } from './dtos/create-info.dto'
import { UpdateInfoDto } from './dtos/update-info.dto'

import { InfoService } from './info.service'

/**
 * Controller that deals with routes related with the `info` data.
 */
@ApiTags('info')
@Controller('info')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  /**
   * Method that creates a new entity based on the sent payload.
   *
   * @param dto defines an object that has the entity data.
   * @returns an object that represents the created entity.
   */
  @ApiOperation({ summary: 'Create a single KeyValueEntity' })
  @ApiCreatedResponse({
    description: 'Retrieves the created entity',
    type: KeyValueEntity,
  })
  @ApiBadRequestResponse({
    description: 'Payload sent with invalid or missing properties.',
  })
  @ProtectTo(RoleEnum.admin)
  @Post()
  async createOne(
    @Body()
    dto: CreateInfoDto,
  ): Promise<KeyValueEntity> {
    return this.infoService.createOne(dto)
  }

  /**
   * Method that searches for default entity.
   *
   * @returns an object that represents the found entity.
   */
  @ApiOperation({ summary: 'Retrieve the default KeyValueEntity' })
  @ApiCreatedResponse({
    description: 'Retrieve the found KeyValueEntity',
    type: KeyValueEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @Get()
  async getOne(): Promise<KeyValueEntity> {
    return this.infoService.getOne()
  }

  /**
   * Method that updates some entity data.
   *
   * @param dto defines an object that represents the new entity data.
   * @returns an object that represents the updated entity.
   */
  @ApiOperation({ summary: 'Update a single KeyValueEntity' })
  @ApiOkResponse({
    description: 'Retrive the updated KeyValueEntity',
    type: KeyValueEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ApiBadRequestResponse({
    description: 'Payload sent with invalid or missing properties.',
  })
  @ProtectTo(RoleEnum.admin)
  @Patch()
  async updateOne(
    @Body()
    dto: UpdateInfoDto,
  ): Promise<KeyValueEntity> {
    return this.infoService.updateOne(dto)
  }

  /**
   * Method that deletes entity data.
   *
   * @returns an object that represents the deleted entity.
   */
  @ApiOperation({ summary: 'Delete a single KeyValueEntity' })
  @ApiOkResponse({
    description: 'Retrive the deleted KeyValueEntity',
    type: KeyValueEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ProtectTo(RoleEnum.admin)
  @Delete()
  async deleteOne(): Promise<KeyValueEntity> {
    return this.infoService.deleteOne()
  }
}
