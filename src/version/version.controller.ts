import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common'
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiForbiddenResponse,
  ApiTags,
} from '@nestjs/swagger'

import { ProtectTo } from '../common/decorators/protect-to/protect-to.decorator'

import { KeyValueEntity } from '../key-value/entities/key-value.entity'

import { RoleEnum } from '../common/models/enums/role.enum'
import { CreateVersionDto } from './dtos/create-version.dto'
import { UpdateVersionDto } from './dtos/update-version.dto'

import { VersionService } from './version.service'

/**
 * Controller that deals with routes related with the `version` data.
 */
@ApiTags('version')
@Controller('version')
export class VersionController {
  constructor(private readonly versionService: VersionService) {}

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
    dto: CreateVersionDto,
  ): Promise<KeyValueEntity> {
    return this.versionService.createOne(dto)
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
    return this.versionService.getOne()
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
    dto: UpdateVersionDto,
  ): Promise<KeyValueEntity> {
    return this.versionService.updateOne(dto)
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
    return this.versionService.deleteOne()
  }
}
