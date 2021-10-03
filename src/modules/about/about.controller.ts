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

import { ApiQueryGetMany } from '../../decorators/api-query-get-many/api-query-get-many.decorator'
import { ApiQueryGetOne } from '../../decorators/api-query-get-one/api-query-get-one.decorator'

import { AboutEntity } from './entities/about.entity'

import { PageDto } from '../../shared/page.dto'
import { CreateAboutDto } from './dtos/create-about.dto'
import { UpdateAboutDto } from './dtos/update-about.dto'

import { AboutService } from './about.service'

/**
 * Controller that deals with routes related with the `about` entity.
 */
@Crud({
  model: {
    type: AboutEntity,
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
@ApiTags('about')
@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  /**
   * Method that creates a new entity based on the sent payload.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param dto defines an object that has the entity data.
   * @returns an object that represents the created entity.
   */
  @ApiOperation({ summary: 'Create a single AboutEntity' })
  @ApiCreatedResponse({
    description: 'Retrieves the created entity',
    type: AboutEntity,
  })
  @ApiBadRequestResponse({
    description: 'Payload sent with invalid or missing properties.',
  })
  @Post()
  async createOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
    @Body()
    dto: CreateAboutDto,
  ): Promise<AboutEntity> {
    return this.aboutService.createOne(crudRequest, dto)
  }

  /**
   * Method that searches for one entity based on it id.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the found entity.
   */
  @ApiOperation({ summary: 'Retrieve a single AboutEntity' })
  @ApiQueryGetOne()
  @ApiCreatedResponse({
    description: 'Retrieve the found AboutEntity',
    type: AboutEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @Get(':id')
  async getOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
  ): Promise<AboutEntity> {
    return this.aboutService.getOne(crudRequest)
  }

  /**
   * Method that searches for several entities based on the sent route queries.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents all the found entities.
   */
  @ApiOperation({ summary: 'Retrieve several AboutEntities' })
  @ApiQueryGetMany()
  @ApiOkResponse({
    description: 'Retrieve several found AboutEntities',
    type: () => {
      class AboutEntityPage extends PageDto<AboutEntity> {
        @ApiProperty({
          type: AboutEntity,
          isArray: true,
        })
        data: AboutEntity[]
      }
      return AboutEntityPage
    },
  })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @Get()
  async getMany(
    @ParsedRequest()
    crudRequest: CrudRequest,
  ): Promise<PageDto<AboutEntity> | AboutEntity[]> {
    return this.aboutService.getMany(crudRequest)
  }

  /**
   * Method that updates some entity data.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @param dto defines an object that represents the new entity data.
   * @returns an object that represents the updated entity.
   */
  @ApiOperation({ summary: 'Update a single AboutEntity' })
  @ApiOkResponse({
    description: 'Retrive the updated AboutEntity',
    type: AboutEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ApiBadRequestResponse({
    description: 'Payload sent with invalid or missing properties.',
  })
  @Patch(':id')
  async updateOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
    @Body()
    dto: UpdateAboutDto,
  ): Promise<AboutEntity> {
    return this.aboutService.updateOne(crudRequest, dto)
  }

  /**
   * Method that deletes entity data.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the deleted entity.
   */
  @ApiOperation({ summary: 'Delete a single AboutEntity' })
  @ApiOkResponse({
    description: 'Retrive the deleted AboutEntity',
    type: AboutEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @Delete(':id')
  async deleteOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
  ): Promise<AboutEntity> {
    return this.aboutService.deleteOne(crudRequest)
  }

  /**
   * Method that disables entity data.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the disabled entity.
   */
  @ApiOperation({ summary: 'Disable a single AboutEntity' })
  @ApiOkResponse({
    description: 'Retrive the disabled AboutEntity',
    type: AboutEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ApiConflictResponse({ description: 'Entity already disabled' })
  @Put(':id/disable')
  async disableOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
  ): Promise<AboutEntity> {
    return this.aboutService.disableOne(crudRequest)
  }

  /**
   * Method that enables entity data.
   *
   * @param crudRequest defines an object that represents the sent request.
   * @returns an object that represents the enabled entity.
   */
  @ApiOperation({ summary: 'Enable a single AboutEntity' })
  @ApiOkResponse({
    description: 'Retrive the enabled AboutEntity',
    type: AboutEntity,
  })
  @ApiNotFoundResponse({ description: 'Entity not found' })
  @ApiForbiddenResponse({ description: 'Request user has no permissions' })
  @ApiConflictResponse({ description: 'Entity already enabled' })
  @Put(':id/enable')
  async enableOne(
    @ParsedRequest()
    crudRequest: CrudRequest,
  ): Promise<AboutEntity> {
    return this.aboutService.enableOne(crudRequest)
  }
}
