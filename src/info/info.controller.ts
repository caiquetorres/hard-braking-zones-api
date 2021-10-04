import { Body, Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger'
import { Crud, CrudRequest, ParsedRequest } from '@nestjsx/crud'

import { ApiQueryGetMany } from '../common/decorators/api-query-get-many/api-query-get-many.decorator'
import { ApiQueryGetOne } from '../common/decorators/api-query-get-one/api-query-get-one.decorator'
import { ProtectTo } from '../common/decorators/protect-to/protect-to.decorator'

import { InfoEntity } from './entities/info.entity'

import { RoleEnum } from '../common/models/enums/role.enum'
import { PageDto } from '../common/models/page.dto'
import { CreateInfoDto } from './dtos/create-info.dto'
import { UpdateInfoDto } from './dtos/update-info.dto'

import { InfoService } from './info.service'

/**
 * Controller that deals with routes related with the `info` entity.
 */
@Crud({
  model: {
    type: InfoEntity,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  routes: {
    exclude: [
      'createManyBase',
      'createOneBase',
      'deleteOneBase',
      'getOneBase',
      'getManyBase',
      'recoverOneBase',
      'replaceOneBase',
      'updateOneBase',
    ],
  },
})
@ApiTags('infos')
@Controller('infos')
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  /**
   * Method that creates a new entity based on the sent payload.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param dto defines an object that has the entity data.
   * @returns an object that represents the created entity.
   */
  @ApiOperation({ summary: 'Create a single InfoEntity' })
  @ApiCreatedResponse({
    description: 'Retrieves the created entity',
    type: InfoEntity,
  })
  @ApiBadRequestResponse({
    description: 'Payload sent with invalid or missing properties.',
  })
  @ProtectTo(RoleEnum.admin)
  @Post()
  async createOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
    @Body()
    dto: CreateInfoDto,
  ): Promise<InfoEntity> {
    return this.infoService.createOne(crudRequest, dto)
  }

  /**
   * Method that searches for default entity.
   *
   * @returns an object that represents the found entity.
   */
  @ApiOperation({ summary: 'Retrieve the default InfoEntity' })
  @ApiCreatedResponse({
    description: 'Retrieve the found InfoEntity',
    type: InfoEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @Get('default')
  async getDefault(): Promise<InfoEntity> {
    return this.infoService.getDefault()
  }

  /**
   * Method that searches for one entity based on it id.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the found entity.
   */
  @ApiOperation({ summary: 'Retrieve a single InfoEntity' })
  @ApiQueryGetOne()
  @ApiCreatedResponse({
    description: 'Retrieve the found InfoEntity',
    type: InfoEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ProtectTo(RoleEnum.admin)
  @Get(':id')
  async getOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
  ): Promise<InfoEntity> {
    return this.infoService.getOne(crudRequest)
  }

  /**
   * Method that searches for several entities based on the sent route queries.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents all the found entities.
   */
  @ApiOperation({ summary: 'Retrieve several InfoEntities' })
  @ApiQueryGetMany()
  @ApiOkResponse({
    description: 'Retrieve several found InfoEntities',
    type: () => {
      class InfoEntityPage extends PageDto<InfoEntity> {
        @ApiProperty({
          type: InfoEntity,
          isArray: true,
        })
        data: InfoEntity[]
      }
      return InfoEntityPage
    },
  })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ProtectTo(RoleEnum.admin)
  @Get()
  async getMany(
    @ParsedRequest()
    crudRequest: CrudRequest,
  ): Promise<PageDto<InfoEntity> | InfoEntity[]> {
    return this.infoService.getMany(crudRequest)
  }

  /**
   * Method that updates some entity data.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param dto defines an object that represents the new entity data.
   * @returns an object that represents the updated entity.
   */
  @ApiOperation({ summary: 'Update a single InfoEntity' })
  @ApiOkResponse({
    description: 'Retrive the updated InfoEntity',
    type: InfoEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ApiBadRequestResponse({
    description: 'Payload sent with invalid or missing properties.',
  })
  @ProtectTo(RoleEnum.admin)
  @Patch(':id')
  async updateOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
    @Body()
    dto: UpdateInfoDto,
  ): Promise<InfoEntity> {
    return this.infoService.updateOne(crudRequest, dto)
  }

  /**
   * Method that deletes entity data.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the deleted entity.
   */
  @ApiOperation({ summary: 'Delete a single InfoEntity' })
  @ApiOkResponse({
    description: 'Retrive the deleted InfoEntity',
    type: InfoEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ProtectTo(RoleEnum.admin)
  @Delete(':id')
  async deleteOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
  ): Promise<InfoEntity> {
    return this.infoService.deleteOne(crudRequest)
  }

  /**
   * Method that disables entity data.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the disabled entity.
   */
  @ApiOperation({ summary: 'Disable a single InfoEntity' })
  @ApiOkResponse({
    description: 'Retrive the disabled InfoEntity',
    type: InfoEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ApiConflictResponse({ description: 'Entity already disabled' })
  @ProtectTo(RoleEnum.admin)
  @Put(':id/disable')
  async disableOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
  ): Promise<InfoEntity> {
    return this.infoService.disableOne(crudRequest)
  }

  /**
   * Method that enables entity data.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the enabled entity.
   */
  @ApiOperation({ summary: 'Enable a single InfoEntity' })
  @ApiOkResponse({
    description: 'Retrive the enabled InfoEntity',
    type: InfoEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ApiConflictResponse({ description: 'Entity already enabled' })
  @ProtectTo(RoleEnum.admin)
  @Put(':id/enable')
  async enableOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
  ): Promise<InfoEntity> {
    return this.infoService.enableOne(crudRequest)
  }
}
